import { Request, Router } from 'express';
import { TheaterController } from './theater.controller';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { IdDto } from '../../common/dto/id.dto';
import { FilterDto } from './dto/filter.dto';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';

/**
 * @swagger
 * tags:
 *  - name: theater
 */

export class TheaterRouter {
  private router = Router();
  private theaterController: TheaterController = new TheaterController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /theater/create:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - theater
     *    requestBody:
     *      description: Create a new theater
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateTheaterDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateTheaterDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateTheaterDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Theater'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Theater'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Theater'
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
      validationHandler(CreateTheaterDto),
      (req, res, next) =>
        this.theaterController.createTheaterController(req, res, next),
    );
    
    // this.router.put(
    //   '/update/:id',
    //   uploadFileMiddleware,
    //   bodyParserHandler,
    //   validationHandler(UpdateTheaterParsedDto),
    //   (req, res, next) =>
    //     this.theaterController.updateTheaterController(
    //       req as ExtendedRequest<UpdateTheaterParsedDto>,
    //       res,
    //       next,
    //     ),
    // );
    /**
     * @swagger
     * /theater:
     *  get:
     *    produces:
     *      - application/json
     *    tags:
     *      - theater
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
      (req, res, next) => this.theaterController.getAll(req, res, next),
    );

    /**
     * @swagger
     * /theater/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - theater
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the theater to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Theater'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Theater not found
     */

    this.router.get(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.theaterController.getOne(req, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
