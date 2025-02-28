import { Request, Router } from 'express';
import { ScreeningController } from './screening.controller';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';
import {
  uploadFileMiddleware,
} from '../../common/middlewares/upload-file';
import { IdDto } from '../../common/dto/id.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

/**
 * @swagger
 * tags:
 *  - name: screening
 */

export class ScreeningRouter {
  private router = Router();
  private screeningController: ScreeningController = new ScreeningController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /screening/create:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - screening
     *    requestBody:
     *      description: Create a new screening
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateScreeningDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateScreeningDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateScreeningDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Screening'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Screening'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Screening'
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
      validationHandler(CreateScreeningDto),
      (req, res, next) =>
        this.screeningController.createScreeningController(req, res, next),
    );

    this.router.put(
      '/updateSeat',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      validationHandler(UpdateSeatDto),
      (req, res, next) => this.screeningController.updateSeat(req, res, next),
    );

    this.router.put(
      '/temporarilyReserveSeat',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      validationHandler(UpdateSeatDto),
      (req, res, next) =>
        this.screeningController.temporarilyReserveSeat(req, res, next),
    );

    // this.router.put(
    //   '/update/:id',
    //   uploadFileMiddleware,
    //   bodyParserHandler,
    //   validationHandler(UpdateScreeningParsedDto),
    //   (req, res, next) =>
    //     this.screeningController.updateScreeningController(
    //       req as ExtendedRequest<UpdateScreeningParsedDto>,
    //       res,
    //       next,
    //     ),
    // );
    /**
     * @swagger
     * /screening:
     *  get:
     *    produces:
     *      - application/json
     *    tags:
     *      - screening
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
      (req, res, next) => this.screeningController.getAll(req, res, next),
    );

    /**
     * @swagger
     * /screening/seats/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - screening
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the screening to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *                type: array
     *                items:  
     *                  $ref: '#/components/schemas/Seat'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Screening not found
     */

    this.router.get(
      '/seats/:id',
      validationHandler(IdDto, 'params'),
      cacheRedisHandler,
      (req: Request<{ id: string }>, res, next) =>
        this.screeningController.getScreeningSeats(req, res, next),
    );

    /**
     * @swagger
     * /screening/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - screening
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the screening to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Screening'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Screening not found
     */

    this.router.get(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.screeningController.getOne(req, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
