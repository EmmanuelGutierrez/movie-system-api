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
import { UpdateSeatDto } from './dto/update-seat.dto';
import {
  isRedisWorking,
  readDataRedis,
  writeDataRedis,
} from '../../redis/redis-client';
import { requestToKey } from '../../common/utils/requestToKey';
import { Request } from 'express';
import { sha1 } from 'object-hash';
import { SeatsI } from '../theater/interface/seats.interface';
import { io } from '../../app';
import Bull from 'bull';
import { config } from '../../config/config';

export class ScreeningService {
  private screeningModel = ScreeningModel;
  private movieService = new MovieService();
  private theaterService = new TheaterService();
  private seatReservetionQueue = new Bull('seat-reservation', {
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
      const { screeningId, seat:{row,number} } = job.data;
      const iswokring = isRedisWorking();
      if(iswokring){
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
          if (seat.number === number && seat.row === row) {
            const { number, row, _id } = seat;
            return { number, row, occupied: false, _id };
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

  async updateSeat({ row, number, screeningId, occupied }: UpdateSeatDto) {
    const seatUpdate = await this.screeningModel.updateOne(
      { _id: screeningId, availableSeats: { $elemMatch: { row, number } } },
      { $set: { 'availableSeats.$.occupied': occupied } },
    );
    return seatUpdate;
  }

  async temporarilyReserveSeat(req: Request<{}, {}, UpdateSeatDto>) {
    const { number, occupied, row, screeningId } = req.body;
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
      const reservedSeat = seats.map((seat) => {
        if (seat.number === number && seat.row === row) {
          const { number, row, _id } = seat;
          return { number, row, occupied: true, _id };
        }
        return seat;
      });
      writeDataRedis(key, JSON.stringify(reservedSeat));
      this.seatReservetionQueue.add(
        { screeningId, seat: { row, number } },
        {
          jobId: `${screeningId}-${row}-${number}`,
          delay: 1 * 30 * 1000,
          removeOnComplete: true,
        },
      );
      io.to(screeningId).emit('joinScreening', reservedSeat);
      // const jobs=await this.seatReservetionQueue.getJobs(['completed','failed','paused','active'])
      // jobs.map(async j=>{await j.remove()})
      // console.log('seats', screeningId, reservedSeat,jobs);
    } else {
      console.log('no working');
    }
  }
}
