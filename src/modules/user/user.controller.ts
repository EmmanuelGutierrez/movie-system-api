import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { UserService } from './user.service';
import { IdDto } from '../../common/dto/id.dto';
import { RequestAuth } from '../../common/auth/request-auth';
import { NotFoundException } from '../../common/utils/error';

export class UserController {
  private userSerivce: UserService = new UserService();
  constructor() {}

  async me(req: RequestAuth, res: Response, next: NextFunction) {
    try {
      console.log(req.user, req)
      const user = req.user
      if(!user){
        throw new NotFoundException("User")
      }
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
