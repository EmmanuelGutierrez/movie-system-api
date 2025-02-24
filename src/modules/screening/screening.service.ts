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

export class ScreeningService {
  private screeningModel = ScreeningModel;
  private movieService = new MovieService();
  private theaterService = new TheaterService();

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
      const exist= await this.existBetweenTime(startTime,endTime,theaterId);
      console.log(exist);
      if(exist){
        throw new ConflictException()
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
      console.log(error)
      throw new HttpException(error.message ?? 'Error', error.status??500);
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
      throw new HttpException(error.message ?? 'Error', error.status??500);
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
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }

  async existBetweenTime(startTime:number,endTime:number,theaterId:string){
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

    return exist
  }
}
