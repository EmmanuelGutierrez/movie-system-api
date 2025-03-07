import { HttpException } from '../../common/utils/error/HttpException';
import { ScreeningModel } from './model/screening.model';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { MovieService } from '../movie/movie.service';
import { FilterDto } from './dto/filter.dto';
import { FilterQuery } from 'mongoose';
import { ScreeningI } from './interface/screening.interface';
import { TheaterService } from '../theater/theater.service';
import { roundedTime } from '../../common/utils/roundedTime';
import { ConflictException, NotFoundException } from '../../common/utils/error';
import { SeatPosition, UpdateSeatDto } from './dto/update-seat.dto';
import {
  isRedisWorking,
  readDataRedis,
  writeDataRedis,
} from '../../redis/redis-client';
import { requestToKey } from '../../common/utils/requestToKey';
import { Request } from 'express';
import { sha1 } from 'object-hash';
import { io } from '../../app';
import Bull from 'bull';
import { config } from '../../config/config';
import { InvoiceService } from '../invoice/invoice.service';
import { SeatsI } from '../theater/interface/seats.interface';
import { statusSeat } from '../../common/constant/seat-status.enum';
import { RequestAuth } from '../../common/auth/request-auth';

export class ScreeningService {
  private screeningModel = ScreeningModel;
  private movieService = new MovieService();
  private theaterService = new TheaterService();
  private invoiceService = new InvoiceService();
  private seatReservetionQueue = new Bull<{
    screeningId: string;
    seatsPosition: SeatPosition[];
  }>('seat-reservation', {
    redis: {
      host: config.redis.host,
      port: config.redis.port,
      db: config.redis.db,
      password: config.redis.password,
    },
  });

  constructor() {
    this.seatReservetionQueue.process(async (job) => {
      // const {
      //   screeningId,
      //   seat: { row, number },
      // } = job.data;
      // console.log(job);
      const { screeningId, seatsPosition } = job.data;
      const iswokring = isRedisWorking();
      if (iswokring) {
        const hashed = sha1({ query: {}, body: {} });
        const key = `/seats/${screeningId}@${hashed}`;
        const cachedValue = await readDataRedis(key);
        let seats: SeatsI[] = [];
        if (cachedValue) {
          // // try {
          // //   return res.json(JSON.parse(cachedValue));
          // // } catch (error) {
          // //   return res.json(cachedValue);
          // // }
          // console.log('cachedValue', cachedValue);
          seats = JSON.parse(cachedValue);
        } else {
          console.log('No cacheado');
          seats = await this.getScreeningSeats(screeningId);
        }
        const reservedSeat = seats.map((seat) => {
          if (
            seatsPosition.some(
              (sp) => sp.number === seat.number && sp.row === seat.row && seat.status!==statusSeat.OCCUPIED
            )
          ) {
            const { number, row, _id } = seat;
            return { number, row, status: statusSeat.AVAILABLE, _id };
          }
          return seat;
        });
        writeDataRedis(key, JSON.stringify(reservedSeat));
        io.to(screeningId).emit('joinScreening', reservedSeat);
      }
    });
  }

  async createScreening({
    movieId,
    theaterId,
    startTime,
    ...data
  }: CreateScreeningDto) {
    try {
      // const existScreening = await this.userModel.exists({ email: data.email });
      // if (existScreening) {
      //   throw new HttpException('user exist', 400);
      // }

      const movie = await this.movieService.getOneById(movieId);
      const theater = await this.theaterService.getOneById(theaterId);
      const endTime = roundedTime(startTime, movie.duration);
      const exist = await this.existBetweenTime(startTime, endTime, theaterId);
      if (exist) {
        throw new ConflictException();
      }
      const user = await this.screeningModel.create({
        movie,
        availableSeats: theater.seatingPlan.layout,
        endTime,
        startTime,
        theater,
        ...data,
      });

      return user.save();
    } catch (error: any) {
      console.log(error);
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  async getOneById(id: string) {
    try {
      const screening = await this.screeningModel.findOne({ _id: id });
      if (!screening) {
        throw new NotFoundException('Not found');
      }
      return screening;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  async getAll(params: FilterDto) {
    try {
      const { limit = 10, page = 1, genres, name, startTime } = params;
      const filters: FilterQuery<ScreeningI> = {};
      if (genres && genres.length) {
        filters.genres = { $elemMatch: { $in: genres } };
      }
      if (name) {
        filters.name = { $rejex: name };
      }
      if (startTime) {
        filters.startTime = { $gt: startTime };
      }
      filters.active = true;
      const screenings = await this.screeningModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate([]);
      if (!screenings) {
        throw new NotFoundException('Not found');
      }
      return screenings;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  async existBetweenTime(
    startTime: number,
    endTime: number,
    theaterId: string,
  ) {
    const exist = await this.screeningModel.findOne({
      theater: theaterId,
      $or: [
        {
          startTime: { $gte: startTime, $lte: endTime },
        },
        {
          startTime: { $lte: startTime, $gte: endTime },
        },
        {
          endTime: { $gte: startTime, $lte: endTime },
        },
      ],
    });

    return exist;
  }

  async getScreeningSeats(screeningId: string) {
    const seats = await this.screeningModel
      .findOne({ _id: screeningId })
      .select('availableSeats');
    if (!seats) {
      throw new NotFoundException('Screening not found');
    }
    return seats.availableSeats;
  }

  async getScreeningOneSeat(screeningId: string, row: number, number: number) {
    const seats = await this.screeningModel
      .findOne({
        _id: screeningId,
      })
      .select('availableSeats');

    const seat = seats?.availableSeats.find(
      (s) => s.number === number && s.row === row,
    );
    if (!seat) {
      throw new NotFoundException('Screening not found');
    }
    return seat;
  }

  async updateSeat({ seatsPosition, screeningId, status }: UpdateSeatDto) {
    const promises = seatsPosition.map(({ number, row }) => {
      const seatUpdate = this.screeningModel.updateOne(
        { _id: screeningId, availableSeats: { $elemMatch: { row, number } } },
        { $set: { 'availableSeats.$.status': status } },
      );
      return seatUpdate;
    });
    const res = await Promise.all(promises);
    return res;
  }

  async temporarilyReserveSeat(req: RequestAuth<{}, {}, UpdateSeatDto>) {
   const { seatsPosition, screeningId } = req.body;
   const iswokring = isRedisWorking();
   if (iswokring) {
     const hashed = sha1({ query: {}, body: {} });
     const key = `/seats/${req.body.screeningId}@${hashed}`;
     const cachedValue = await readDataRedis(key);
     let seats: SeatsI[] = [];
     if (cachedValue) {
       // // try {
       // //   return res.json(JSON.parse(cachedValue));
       // // } catch (error) {
       // //   return res.json(cachedValue);
       // // }
       // console.log('cachedValue', cachedValue);
       seats = JSON.parse(cachedValue);
     } else {
       console.log('No cacheado');
       seats = await this.getScreeningSeats(screeningId);
     }

     const reservedSeats = seats.filter((seat, i) => {
       const isTrue =
         seatsPosition.some(
           (sp) => sp.number === seat.number && sp.row === seat.row,
         ) &&
         !seat.userId &&
         seat.status === statusSeat.AVAILABLE;

       if (isTrue) {
         seats[i].userId = req.user._id;
         seats[i].status = statusSeat.TEMPORARILY_RESERVED;
       }
       return isTrue;
     });
     if (
       !reservedSeats.length ||
       reservedSeats.length !== req.body.seatsPosition.length
     ) {
       io.emit('error', {
         message: `Seat ${seatsPosition.toString()} | screening ${screeningId} | `,
       });
       throw new ConflictException("conflict reserve seat")
     }
     writeDataRedis(key, JSON.stringify(seats));
     const hashSeatsPosition = sha1(seatsPosition);
     this.seatReservetionQueue.add(
       { screeningId, seatsPosition },
       {
         jobId: `${screeningId}-${hashSeatsPosition}`,
         delay: 1 * 30 * 1000,
         removeOnComplete: true,
       },
     );
     io.to(screeningId).emit('joinScreening', seats);
   } else {
     console.log('no working');
   }
  }

  async reserveSeat(req: RequestAuth<{}, {}, UpdateSeatDto>) {
    const { seatsPosition, screeningId } = req.body;
    const iswokring = isRedisWorking();
    if (iswokring) {
      const hashed = sha1({ query: {}, body: {} });
      const key = `/seats/${req.body.screeningId}@${hashed}`;
      const cachedValue = await readDataRedis(key);
      let seats: SeatsI[] = [];
      if (cachedValue) {
        seats = JSON.parse(cachedValue);
      } else {
        console.log('No cacheado');
        seats = await this.getScreeningSeats(screeningId);
      }
      const screening = await this.getOneById(screeningId);
      const reservedSeats: SeatsI[] = [];
      const newSeats = seats.map((seat,) => {
        const isTrue =
          seatsPosition.some(
            (sp) => sp.number === seat.number && sp.row === seat.row,
          ) &&
          seat.userId === req.user?._id &&
          seat.status === statusSeat.TEMPORARILY_RESERVED;
        // (seat.status === statusSeat.TEMPORARILY_RESERVED ||
        //   seat.status === statusSeat.AVAILABLE);

        if (isTrue) {
          const { number, row, _id, userId } = seat;
          const reservedSeat: SeatsI = {
            number,
            row,
            _id,
            userId,
            status: statusSeat.OCCUPIED,
          };
          reservedSeats.push(reservedSeat);
          return reservedSeat;
        }
        return seat;
      });
      if (
        !reservedSeats.length ||
        reservedSeats.length !== seatsPosition.length
      ) {
        // io.emit('error', {
        //   message: `Seat number ${number} | row ${row} | screening ${screeningId}`,
        // });
        throw new ConflictException('seat conflict');
      }
      const hashSeatsPosition = sha1(seatsPosition);
      const job = await this.seatReservetionQueue.getJob(
        `${screeningId}-${hashSeatsPosition}`,
      );
      if (job) {
        job.remove();
      }
      const res = await this.updateSeat({
        screeningId,
        seatsPosition,
        status: statusSeat.OCCUPIED,
      });
      await this.invoiceService.createInvoice({
        screeningId,
        seats: reservedSeats,
        totalPrice: reservedSeats.length * screening.price,
        userId: req.user._id,
        status: 'pending',
      });
      writeDataRedis(key, JSON.stringify(newSeats));
      io.to(screeningId).emit('joinScreening', newSeats);
      return res;
    } else {
      console.log('no working');
    }
  }
}
