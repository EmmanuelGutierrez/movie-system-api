import { Router } from 'express';
import { MovieController } from './movie.controller';
import { CreateMovieDto } from './dto/create-movie.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { FilterDto } from './dto/filter.dto';


export class MovieRouter {
  private router = Router();
  private movieController: MovieController = new MovieController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.post(
      '/create',
      validationHandler(CreateMovieDto),
      (req, res, next) =>
        this.movieController.createMovieController(req, res, next),
    );
    this.router.get('/', validationHandler(FilterDto,'query'), (req, res, next) =>
      this.movieController.getAll(req, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
