// import { Model } from 'mongoose';
import { HttpException } from '../../common/utils/error/HttpException';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieModel } from './model/movie.model';
// import { MovieI } from './interface/movie.interface';

// export const createMovieService = async (data: CreateMovieDto) => {
//   try {
//     // throw new Error("Error")
//     const movie = await MovieModel.create(data);
//     console.log(movie);

//     return movie.save();
//   } catch (error) {
//     console.log(error);
//     throw new HttpException('Error 1', 123);
//   }
// };

export class MovieService {
  private movieModel = MovieModel;

  async createMovie(data: CreateMovieDto) {
    try {
      // throw new Error("Error")
      const movie = await this.movieModel.create(data);

      return movie.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 123);
    }
  }

  async getAll() {
    try {
      // throw new Error("Error")
      const movies = await this.movieModel.find()
      return movies
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Not found', 404);
    }
  }
}
