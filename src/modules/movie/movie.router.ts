import { Request, Router } from 'express';
import { MovieController } from './movie.controller';
import { CreateMovieDto } from './dto/create-movie.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { FilterDto } from './dto/filter.dto';
import { IdDto } from './dto/id.dto';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';
import { roleHandler } from '../../common/middlewares/role-handler';
import {
  uploadFile,
  uploadFileMiddleware,
} from '../../common/middlewares/upload-file';
import { authJWT } from '../../common/middlewares/auth-jwt';
import { CreateMoviePhotosDto } from './dto/create-movie-photos.dto';
import { ExtendedRequest } from './interface/ExtendedRequest';
import { bodyParserHandler } from '../../common/middlewares/body-parser';
import { CreateMovieParsedDto } from './dto/create-movie-parsed.dto';
import { UpdateMovieParsedDto } from './dto/update-movie-parsed.dto';

/**
 * @swagger
 * tags:
 *  - name: movie
 */

export class MovieRouter {
  private router = Router();
  private movieController: MovieController = new MovieController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /movie/create-old:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - movie
     *    requestBody:
     *      description: Create a new movie
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *      '400':
     *        description: Invalid input
     *      '422':
     *        description: Validation exception
     */
    this.router.post(
      '/create-old',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      validationHandler(CreateMovieDto),
      (req, res, next) =>
        this.movieController.createMovieController(req, res, next),
    );
    /**
     * @swagger
     * /movie/create:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - movie
     *    requestBody:
     *      description: Create a new movie
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateMovieDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Movie'
     *      '400':
     *        description: Invalid input
     *      '422':
     *        description: Validation exception
     */
    this.router.post(
      '/create',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      uploadFileMiddleware,
      bodyParserHandler,
      validationHandler(CreateMovieParsedDto),
      (req, res, next) =>
        this.movieController.createMovieControllerPhotos(
          req as ExtendedRequest<CreateMovieParsedDto>,
          res,
          next,
        ),
    );
    this.router.put(
      '/update/:id',
      uploadFileMiddleware,
      bodyParserHandler,
      validationHandler(UpdateMovieParsedDto),
      (req, res, next) =>
        this.movieController.updateMovieController(
          req as ExtendedRequest<UpdateMovieParsedDto>,
          res,
          next,
        ),
    );
    /**
     * @swagger
     * /movie:
     *  get:
     *    produces:
     *      - application/json
     *    tags:
     *      - movie
     *    parameters:
     *      - name: limit
     *        in: query
     *        required: false
     *        schema:
     *          type: integer
     *          default: 10
     *      - name: page
     *        in: query
     *        required: false
     *        schema:
     *          type: integer
     *          default: 1
     *      - name: decription
     *        in: query
     *        required: false
     *        schema:
     *          type: string
     *      - name: genres
     *        in: query
     *        required: false
     *        schema:
     *          type: array
     *          items:
     *            type: string
     *    responses:
     *      '200':
     *        description: successful operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/GetListDto'
     *          application/xml:
     *            schema:
     *              $ref: '#/components/schemas/GetListDto'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#/components/schemas/GetListDto'
     *      '400':
     *        description: Invalid tag value
     *      '422':
     *        description: Validation exception
     */
    /*
     *
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *               $ref: '#components/schemas/GetListDto'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/GetListDto'
     *          application/x-www-form-urlencoded:
     *            schema:
     *               $ref: '#components/schemas/GetListDto'
     *      '400':
     *        description: Invalid input
     *      '422':
     *        description: Validation exception */

    this.router.get(
      '/',
      validationHandler(FilterDto, 'query'),
      cacheRedisHandler,
      (req, res, next) => this.movieController.getAll(req, res, next),
    );

    /**
     * @swagger
     * /movie/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - movie
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the movie to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Movie'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Movie not found
     */

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
