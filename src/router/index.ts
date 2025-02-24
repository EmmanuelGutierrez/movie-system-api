import { Router } from 'express';
import { MovieRouter } from '../modules/movie/movie.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { authJWT } from '../common/middlewares/auth-jwt';
import { TheaterRouter } from '../modules/theater/theater.router';
import { ScreeningRouter } from '../modules/screening/screening.router';

/* const router = Router();
router.use('/movie', MovieRouter);
export const MainRouter: Router = router;
 */
export class MainRouter {
  private router = Router();
  private movieRouter = new MovieRouter();
  private authRouter = new AuthRouter();
  private theaterRouter = new TheaterRouter();
  private screeningRouter = new ScreeningRouter();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.use('/movie', /* authJWT, */ this.movieRouter.getRoute());
    this.router.use('/theater', /* authJWT, */ this.theaterRouter.getRoute());
    this.router.use('/screening', /* authJWT, */ this.screeningRouter.getRoute());
    this.router.use('/auth', this.authRouter.getRoute());
  }

  getRoute() {
    return this.router;
  }
}
