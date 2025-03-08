import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { IdDto } from '../../common/dto/id.dto';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { FilterCinemaDto } from './dto/filter.dto';

export class CinemaController {
  private cinemaSerivce: CinemaService = new CinemaService();
  constructor() {}

  async createCinemaController(
    req: Request<{}, {}, CreateCinemaDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const cinema = await this.cinemaSerivce.createCinema(req.body);
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }

  async updateCinemaController(
    req: Request<IdDto,UpdateCinemaDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const cinema = await this.cinemaSerivce.update(
        req.params.id,
        req.body,
      );
      return res.json(cinema);
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    req: Request<{}, {}, {}, FilterCinemaDto>,
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
