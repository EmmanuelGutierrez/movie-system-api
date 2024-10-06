import { FilterQuery } from 'mongoose';
import { HttpException } from '../../common/utils/error/HttpException';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieModel } from './model/movie.model';
import { MovieI } from './interface/movie.interface';
import { redisClient } from '../../redis/redis-client';
import { FileService } from '../file/file.service';
import { FileModel } from '../file/model/file.model';

export class MovieService {
  private movieModel = MovieModel;
  private fileService = new FileService();

  async createMovie({ imageBase64, ...data }: CreateMovieDto) {
    try {
      const movie = await this.movieModel.create(data);
      const image = await this.fileService.create(
        imageBase64,
        movie.id,
        `movies/files/posters`,
      );

      movie.poster = image;
      return movie.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }

  async getAll(params: FilterDto) {
    try {
      // const movies = await this.movieModel.find();
      const { limit = 10, page = 1, genres, description } = params;
      const filters: FilterQuery<MovieI> = {};
      if (genres && genres.length) {
        filters.genres = { $elemMatch: { $in: genres } };
      }
      if (description) {
        filters.description = { $rejex: description };
      }
      filters.active = true;
      const movies = await this.movieModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('poster');

      const total = await this.movieModel.countDocuments();
      return { page, inThisPage: movies.length, total, data: movies };
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  async getOneById(id: string) {
    try {
      // const movies = await this.movieModel.find();
      const movie = await this.movieModel.findById(id);

      if (!movie) {
        throw new HttpException('Not found', 404);
      }
      return movie;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  async update(movieId: string, data: UpdateMovieDto) {
    try {
      const movie = await this.movieModel.updateOne({ _id: movieId }, data);

      return movie;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }

  async logicDelete(movieId: string) {
    try {
      const movie = await this.getOneById(movieId);
      const res = await this.movieModel.updateOne(
        { _id: movieId },
        { active: !movie.active },
      );

      return res;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }
}
