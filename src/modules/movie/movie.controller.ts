import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

export class MovieController {
  private movieSerivce: MovieService = new MovieService();
  constructor() {
  }

  async createMovieController(
    req: Request<{}, {}, CreateMovieDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const movie = await this.movieSerivce.createMovie(req.body);
      return res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request<{}, {}, CreateMovieDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req.query)
      const movies = await this.movieSerivce.getAll()
      return res.json(movies);
    } catch (error) {
      next(error);
    }
  }
}
