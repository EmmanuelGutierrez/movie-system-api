import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { IdDto } from '../../common/dto/id.dto';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { FilterInvoiceDto } from './dto/filter.dto';

export class InvoiceController {
  private cinemaSerivce: InvoiceService = new InvoiceService();
  constructor() {}

  async createInvoiceController(
    req: Request<{}, {}, CreateInvoiceDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const cinema = await this.cinemaSerivce.createInvoice(req.body);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }

  // async updateInvoiceController(
  //   req: Request<IdDto,UpdateInvoiceDto>,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const cinema = await this.cinemaSerivce.update(
  //       req.params.id,
  //       req.body,
  //     );
  //     return res.json(cinema);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getAll(
    req: Request<{}, {}, {}, FilterInvoiceDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const cinemas = await this.cinemaSerivce.getAll(req.query);
      return res.json(cinemas);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request<IdDto>, res: Response, next: NextFunction) {
    try {
      const cinemas = await this.cinemaSerivce.getOneById(req.params.id);
      return res.json(cinemas);
    } catch (error) {
      next(error);
    }
  }

  // async logicDelete(req: Request<IdDto>, res: Response, next: NextFunction) {
  //   try {
  //     const cinemas = await this.cinemaSerivce.logicDelete(req.params.id);
  //     return res.json(cinemas);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
