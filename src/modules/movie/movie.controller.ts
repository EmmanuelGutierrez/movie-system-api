import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { FilterDto } from './dto/filter.dto';
import { IdDto } from './dto/id.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

export class MovieController {
  private movieSerivce: MovieService = new MovieService();
  constructor() {}

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

  async updateMovieController(
    req: Request<IdDto, {}, UpdateMovieDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const movie = await this.movieSerivce.update(req.params.id, req.body);
      return res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request<{}, {}, {}, FilterDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const movies = await this.movieSerivce.getAll(req.query);
      return res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request<IdDto>, res: Response, next: NextFunction) {
    try {
      console.log(req.params);
      const movies = await this.movieSerivce.getOneById(req.params.id);
      return res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  async logicDelete(req: Request<IdDto>, res: Response, next: NextFunction) {
    try {
      const movies = await this.movieSerivce.logicDelete(req.params.id);
      return res.json(movies);
    } catch (error) {
      next(error);
    }
  }
}
