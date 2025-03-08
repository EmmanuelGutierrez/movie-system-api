import { Request, Router } from 'express';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { IdDto } from '../../common/dto/id.dto';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';
import { roleHandler } from '../../common/middlewares/role-handler';
import {
  uploadFile,
  uploadFileMiddleware,
} from '../../common/middlewares/upload-file';
import { authJWT } from '../../common/middlewares/auth-jwt';
import { bodyParserHandler } from '../../common/middlewares/body-parser';
import { CinemaController } from './cinema.controller';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { FilterCinemaDto } from './dto/filter.dto';

/**
 * @swagger
 * tags:
 *  - name: cinema
 */

export class CinemaRouter {
  private router = Router();
  private cinemaController: CinemaController = new CinemaController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /cinema/:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - cinema
     *    requestBody:
     *      description: Create a new cinema
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateCinemaDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateCinemaDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateCinemaDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Cinema'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Cinema'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Cinema'
     *      '400':
     *        description: Invalid input
     *      '422':
     *        description: Validation exception
     */
    this.router.post(
      '/',
      authJWT, 
      // roleHandler(),
      // uploadFile(),
      validationHandler(CreateCinemaDto),
      (req, res, next) =>
        this.cinemaController.createCinemaController(req, res, next),
    );

    this.router.put(
      '/update/:id',
      authJWT,
      validationHandler(UpdateCinemaDto),
      (req, res, next) =>
        this.cinemaController.updateCinemaController(
          req as unknown as Request<IdDto, UpdateCinemaDto>,
          res,
          next,
        ),
    );
    /**
     * @swagger
     * /cinema:
     *  get:
     *    produces:
     *      - application/json
     *    tags:
     *      - cinema
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
      validationHandler(FilterCinemaDto, 'query'),
      cacheRedisHandler,
      (req, res, next) => this.cinemaController.getAll(req, res, next),
    );

    /**
     * @swagger
     * /cinema/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - cinema
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the cinema to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cinema'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Cinema not found
     */

    this.router.get(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.cinemaController.getOne(req, res, next),
    );
    // this.router.delete(
    //   '/:id',
    //   validationHandler(IdDto, 'params'),
    //   (req: Request<{ id: string }>, res, next) =>
    //     this.cinemaController.logicDelete(req, res, next),
    // );
  }

  getRoute() {
    return this.router;
  }
}
