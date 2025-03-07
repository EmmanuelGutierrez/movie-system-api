import { Request, Router } from 'express';
import { UserController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { validationHandler } from '../../common/middlewares/validationHandler';
import { IdDto } from '../../common/dto/id.dto';
import { cacheRedisHandler } from '../../common/middlewares/cache-redis';
import { RequestAuth } from '../../common/auth/request-auth';
import { authJWT } from '../../common/middlewares/auth-jwt';

/**
 * @swagger
 * tags:
 *  - name: user
 */

export class UserRouter {
  private router = Router();
  private userController: UserController = new UserController();
  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    /**
     * @swagger
     * /user/me:
     *   get:
     *     produces:
     *       - application/json
     *     tags:
     *       - user
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       '400':
     *         description: Invalid ID
     *       '404':
     *         description: User not found
     */

    this.router.get(
      '/me',
      authJWT,
      (req, res, next) =>
        this.userController.me(req as RequestAuth, res, next),
    );
  }

  getRoute() {
    return this.router;
  }
}
