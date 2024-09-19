import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import {  MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';

const movieSerivce = new MovieService();
export const createMovieController = async (
  req: Request<{}, {}, CreateMovieDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movie = await movieSerivce.createMovie(req.body);
    return res.json(movie);
  } catch (error) {
    next(error);
  }
  // return next();
};
