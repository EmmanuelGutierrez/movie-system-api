import { Router } from 'express';
import { MovieRouter } from '../modules/movie/movie.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { authJWT } from '../common/middlewares/auth-jwt';

/* const router = Router();
router.use('/movie', MovieRouter);
export const MainRouter: Router = router;
 */
export class MainRouter {
  private router = Router();
  private movieRouter = new MovieRouter();
  private authRouter = new AuthRouter();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.use('/movie', /* authJWT, */ this.movieRouter.getRoute());
    this.router.use('/auth', this.authRouter.getRoute());
  }

  getRoute() {
    return this.router;
  }
}
