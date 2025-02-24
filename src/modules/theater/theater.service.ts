import { HttpException } from '../../common/utils/error/HttpException';
import { TheaterModel } from './model/theater.model';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { MovieService } from '../movie/movie.service';
import { FilterDto } from './dto/filter.dto';
import { FilterQuery } from 'mongoose';
import { TheaterI } from './interface/theater.interface';
import { SeatsI } from './interface/seats.interface';
import { NotFoundException } from '../../common/utils/error';

export class TheaterService {
  private theaterModel = TheaterModel;
  private movieService = new MovieService();

  async createTheater({ rows, seatsPerRow, ...data }: CreateTheaterDto) {
    try {
      // const existTheater = await this.userModel.exists({ email: data.email });
      // if (existTheater) {
      //   throw new HttpException('user exist', 400);
      // }
      const layout: SeatsI[] = [];
      for (let i = 1; i < rows + 1; i++) {
        for (let k = 1; k < seatsPerRow + 1; k++) {
          layout.push({ occupied: false, number: k, row: i });
        }
      }

      const theater = await this.theaterModel.create({
        seatingPlan: {
          rows,
          seatsPerRow,
          layout,
        },
        ...data,
      });

      return theater.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }

  async getOneById(id: string) {
    try {
      const theater = await this.theaterModel.findOne({ _id: id });
      if (!theater) {
        throw new NotFoundException('Not found');
      }
      return theater;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }

  async getAll(params: FilterDto) {
    try {
      const { limit = 10, page = 1, name, rows,seatsPerRow } = params;
      const filters: FilterQuery<TheaterI> = {};

      if (name) {
        filters.name = { $rejex: name };
      }
      filters.active = true;
      const theaters = await this.theaterModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate([]);
      if (!theaters) {
        throw new NotFoundException()
      }
      return theaters;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }
}
