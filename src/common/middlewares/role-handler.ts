import { NextFunction, Request, Response } from 'express';
import { roles } from '../constant/role.enum';
import { RequestWithUser } from '../models/requestWithUser.model';
import { HttpException } from '../utils/error/HttpException';
import { UserToken } from '../models/user-token.model';

export function roleHandler(rolesArray: roles[] = [roles.ADMIN]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new HttpException('Unauth user', 401);
    }
    const { role } = req.user;
    if (!rolesArray.includes(role.type)) {
      throw new HttpException('Unauth user', 401);

      // return res.send('unauth').status(400);
    }
    next();
  };
}
