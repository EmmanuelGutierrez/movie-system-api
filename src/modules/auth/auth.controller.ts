import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/Login.dto';
import { UserI } from '../user/interface/user.interface';

export class AuthController {
  private authSerivce: AuthService = new AuthService();
  async registerUser(
    req: Request<{}, {}, CreateUserDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.authSerivce.register(req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request<{}, {}, LoginDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
        console.log("login")
      const user = await this.authSerivce.login(req.user as unknown as UserI);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
