import { Request, Router } from 'express';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
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
import { InvoiceController } from './invoice.controller';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { FilterInvoiceDto } from './dto/filter.dto';

/**
 * @swagger
 * tags:
 *  - name: invoice
 */

export class InvoiceRouter {
  private router = Router();
  private invoiceController: InvoiceController = new InvoiceController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /invoice/create:
     *  post:
     *    produces:
     *      - application/json
     *    tags:
     *      - invoice
     *    requestBody:
     *      description: Create a new invoice
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#components/schemas/CreateInvoiceDto'
     *        application/xml:
     *          schema:
     *            $ref: '#components/schemas/CreateInvoiceDto'
     *        application/x-www-form-urlencoded:
     *          schema:
     *            $ref: '#components/schemas/CreateInvoiceDto'
     *    responses:
     *      '200':
     *        description: Succssesfull operation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#components/schemas/Invoice'
     *          application/xml:
     *            schema:
     *              $ref: '#components/schemas/Invoice'
     *          application/x-www-form-urlencoded:
     *            schema:
     *              $ref: '#components/schemas/Invoice'
     *      '400':
     *        description: Invalid input
     *      '422':
     *        description: Validation exception
     */
    this.router.post(
      '/',
      // authJWT,
      // roleHandler(),
      // uploadFile(),
      validationHandler(CreateInvoiceDto),
      (req, res, next) =>
        this.invoiceController.createInvoiceController(req, res, next),
    );
   
    // this.router.put(
    //   '/update/:id',
    //   validationHandler(UpdateInvoiceDto),
    //   (req, res, next) =>
    //     this.invoiceController.updateInvoiceController(
    //       req as unknown as Request<IdDto, UpdateInvoiceDto>,
    //       res,
    //       next,
    //     ),
    // );
    /**
     * @swagger
     * /invoice:
     *  get:
     *    produces:
     *      - application/json
     *    tags:
     *      - invoice
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
      validationHandler(FilterInvoiceDto, 'query'),
      cacheRedisHandler,
      (req, res, next) => this.invoiceController.getAll(req, res, next),
    );

    /**
     * @swagger
     * /invoice/{id}:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - invoice
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: ID of the invoice to retrieve
     *         schema:
     *           type: string
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Invoice'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: Invoice not found
     */

    this.router.get(
      '/:id',
      validationHandler(IdDto, 'params'),
      (req: Request<{ id: string }>, res, next) =>
        this.invoiceController.getOne(req, res, next),
    );
    // this.router.delete(
    //   '/:id',
    //   validationHandler(IdDto, 'params'),
    //   (req: Request<{ id: string }>, res, next) =>
    //     this.invoiceController.logicDelete(req, res, next),
    // );
  }

  getRoute() {
    return this.router;
  }
}
