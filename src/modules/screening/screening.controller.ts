import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { ScreeningService } from './screening.service';
import { CreateScreeningDto } from './dto/create-screening.dto';
import { IdDto } from '../../common/dto/id.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { RequestAuth } from '../../common/auth/request-auth';

export class ScreeningController {
  private screeningSerivce: ScreeningService = new ScreeningService();
  constructor() {}

  async createScreeningController(
    req: Request<{}, {}, CreateScreeningDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const screening = await this.screeningSerivce.createScreening(req.body);
      return res.json(screening);
    } catch (error) {
      next(error);
    }
  }

  // async updateScreeningController(
  //   req: Request<UpdateScreeningDto>,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const screening = await this.screeningSerivce.update(
  //       req.params.id,
  //       req.body,
  //       req.files,
  //     );
  //     return res.json(screening);
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
      const screenings = await this.screeningSerivce.getAll(req.query);
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request<IdDto>, res: Response, next: NextFunction) {
    try {
      const screenings = await this.screeningSerivce.getOneById(req.params.id);
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }

  async updateSeat(
    req: Request<{}, {}, UpdateSeatDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const screenings = await this.screeningSerivce.updateSeat(req.body);
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }
  async temporarilyReserveSeat(
    req: RequestAuth<{}, {}, UpdateSeatDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const screenings =
        await this.screeningSerivce.temporarilyReserveSeat(req);
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }
  async reserveSeat(
    req: RequestAuth<{}, {}, UpdateSeatDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const screenings = await this.screeningSerivce.reserveSeat(req);
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }
  async getScreeningSeats(
    req: Request<IdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const screenings = await this.screeningSerivce.getScreeningSeats(
        req.params.id,
      );
      return res.json(screenings);
    } catch (error) {
      next(error);
    }
  }
}
