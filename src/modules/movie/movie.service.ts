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
import { CreateMoviePhotosDto } from './dto/create-movie-photos.dto';
import { request } from 'express';
import { PhotosPoster } from '../file/type/multiple-files.type';
import { CreateMovieParsedDto } from './dto/create-movie-parsed.dto';
import { UpdateMovieParsedDto } from './dto/update-movie-parsed.dto';
import { NotFoundException } from '../../common/utils/error';

export class MovieService {
  private movieModel = MovieModel;
  private fileService = new FileService();

  async createMovie({ imageBase64, ...data }: CreateMovieDto) {
    try {
      const movie = await this.movieModel.create(data);
      const image = await this.fileService.createBase64(
        imageBase64,
        movie.id,
        `movies/files/posters`,
      );

      movie.poster = image;
      return movie.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }

  async createMoviePhotos(data: CreateMovieParsedDto, files: PhotosPoster) {
    try {
      const movie = await this.movieModel.create(data);
      if (files.poster) {
        const poster = await this.fileService.create(
          files.poster[0],
          `movies/files/posters`,
        );
        movie.poster = poster;
      }
      if (files.photos) {
        const photos = await this.fileService.createMany({
          filesData: files.photos,
          external_id: movie.id,
          folder: `movies/files/photos `,
          toBase64: true,
        });

        movie.photos = photos;
      }
      return movie.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }

  async update(movieId: string, data: UpdateMovieParsedDto, files: PhotosPoster) {
    try {
      console.log('update', files);
      if (files.photos || files.poster) {
        const movie = await this.getOneById(movieId);
        
        console.log("POSTER o foto")
        if (files.poster) {
          console.log("POSTER")//VERIFICAR POR QUE AL REVES NO FUNCIONA
          const poster = await this.fileService.create(
            files.poster[0],
            `movies/files/posters`,
          );
          await this.fileService.deleteFile(movie.poster._id);
          movie.poster = poster;
        }
        if (files.photos) {
          await this.fileService.deleteFileMany({
            ids: movie.photos.map((ph) => ph._id),
            public_ids: movie.photos.map((ph) => ph._id),
          });
          const photos = await this.fileService.createMany({
            filesData: files.photos,
            external_id: movie.id,
            folder: `movies/files/posters`,
            toBase64: true,
          });
          movie.photos = photos;
        }

        await movie.save();
      }
      const res = await this.movieModel.updateOne({ _id: movieId }, data);
      return res;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', error.status??500);
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
        .populate(['poster', 'photos']);

      const total = await this.movieModel.countDocuments();
      return { page, inThisPage: movies.length, total, data: movies };
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }

  async getOneById(id: string) {
    try {
      // const movies = await this.movieModel.find();
      const movie = await this.movieModel
        .findById(id)
        .populate(['poster', 'photos']);

      if (!movie) {
        throw new NotFoundException('Not found');
      }
      return movie;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
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
      throw new HttpException(error.message ?? 'Error', error.status??500);
    }
  }
}
