import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { TheaterService } from './theater.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { IdDto } from '../../common/dto/id.dto';
import { FilterDto } from './dto/filter.dto';

export class TheaterController {
  private theaterSerivce: TheaterService = new TheaterService();
  constructor() {}

  async createTheaterController(
    req: Request<{}, {}, CreateTheaterDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const theater = await this.theaterSerivce.createTheater(req.body);
      return res.json(theater);
    } catch (error) {
      next(error);
    }
  }

  // async updateTheaterController(
  //   req: Request<UpdateTheaterDto>,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const theater = await this.theaterSerivce.update(
  //       req.params.id,
  //       req.body,
  //       req.files,
  //     );
  //     return res.json(theater);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getAll(
    req: Request<{}, {}, {}, FilterDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const theaters = await this.theaterSerivce.getAll(req.query);
      return res.json(theaters);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request<IdDto>, res: Response, next: NextFunction) {
    try {
      const theaters = await this.theaterSerivce.getOneById(req.params.id);
      return res.json(theaters);
    } catch (error) {
      next(error);
    }
  }

  // async logicDelete(req: Request<IdDto>, res: Response, next: NextFunction) {
  //   try {
  //     const theaters = await this.theaterSerivce.logicDelete(req.params.id);
  //     return res.json(theaters);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
