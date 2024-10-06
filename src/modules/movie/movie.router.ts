import { Request, Router } from 'express';
import { MovieController } from './movie.controller';
import { CreateMovieDto } from './dto/create-movie.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { FilterDto } from './dto/filter.dto';
import { IdDto } from './dto/id.dto';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';
import { roleHandler } from '../../common/middlewares/role-handler';
import { uploadFile } from '../../common/middlewares/upload-file';
import { authJWT } from '../../common/middlewares/auth-jwt';

export class MovieRouter {
  private router = Router();
  private movieController: MovieController = new MovieController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters () {
    this.router.post(
      '/create',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      validationHandler(CreateMovieDto),
      (req, res, next) =>
        this.movieController.createMovieController(req, res, next),
    );
    this.router.put(
      '/update',
      validationHandler(CreateMovieDto),
      (req: Request<{ id: string }>, res, next) =>
        this.movieController.updateMovieController(req, res, next),
    );
    this.router.get(
      '/',
      validationHandler(FilterDto, 'query'),
      cacheRedisHandler,
      (req, res, next) => this.movieController.getAll(req, res, next),
    );
    this.router.get(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.movieController.getOne(req, res, next),
    );
    this.router.delete(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.movieController.logicDelete(req, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
