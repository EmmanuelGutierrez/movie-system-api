import { FilterQuery } from 'mongoose';
import { HttpException } from '../../common/utils/error/HttpException';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { FilterCinemaDto } from './dto/filter.dto';
import { CinemaI } from './interface/cinema.interface';
import { redisClient } from '../../redis/redis-client';
import { FileService } from '../file/file.service';
import { request } from 'express';
import { PhotosPoster } from '../file/type/multiple-files.type';
import { NotFoundException } from '../../common/utils/error';
import { CinemaModel } from './model/cinema.model';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

export class CinemaService {
  private cinemaModel = CinemaModel;

  async createCinema(data: CreateCinemaDto) {
    try {
      const cinema = await this.cinemaModel.create(data);

      return cinema.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  async update(cinemaId: string, data: UpdateCinemaDto) {
    try {
      const res = await this.cinemaModel.updateOne({ _id: cinemaId }, data);
      return res;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status ?? 500);
    }
  }

  async getAll(params: FilterCinemaDto) {
    try {
      // const cinemas = await this.cinemaModel.find();
      const { limit = 10, page = 1, location, name } = params;
      const filters: FilterQuery<CinemaI> = {};
      if (location) {
        filters.location = { $rejex: location };
      }
      if (name) {
        filters.name = { $rejex: name };
      }
      const cinemas = await this.cinemaModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate([]);

      const total = await this.cinemaModel.countDocuments();
      return { page, inThisPage: cinemas.length, total, data: cinemas };
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  async getOneById(id: string) {
    try {
      // const cinemas = await this.cinemaModel.find();
      const cinema = await this.cinemaModel
        .findById(id)
        .populate([]);

      if (!cinema) {
        throw new NotFoundException('Not found');
      }
      return cinema;
    } catch (error: any) {
      throw new HttpException(
        error.message ?? 'Not found',
        error.status ?? 500,
      );
    }
  }

  // async logicDelete(cinemaId: string) {
  //   try {
  //     const cinema = await this.getOneById(cinemaId);
  //     const res = await this.cinemaModel.updateOne(
  //       { _id: cinemaId },
  //       { active: !cinema.active },
  //     );

  //     return res;
  //   } catch (error: any) {
  //     throw new HttpException(error.message ?? 'Error', error.status ?? 500);
  //   }
  // }
}
