import { Request, Router } from 'express';
import { AuthController } from './auth.controller';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { LoginDto } from './dto/Login.dto';
import { authLocal } from '../../common/middlewares/auth-local';
import { CreateUserDto } from '../user/dto/create-user.dto';

export class AuthRouter {
  private router = Router();
  private authController: AuthController = new AuthController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.post(
      '/login',
      validationHandler(LoginDto),
      authLocal,
      (req, res, next) => this.authController.login(req, res, next),
    );

    this.router.post(
      '/register',
      validationHandler(CreateUserDto),
      (req, res, next) => this.authController.registerUser(req, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
