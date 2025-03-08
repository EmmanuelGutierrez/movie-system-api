import { Router } from 'express';
import { MovieRouter } from '../modules/movie/movie.router';
import { AuthRouter } from '../modules/auth/auth.router';
import { authJWT } from '../common/middlewares/auth-jwt';
import { TheaterRouter } from '../modules/theater/theater.router';
import { ScreeningRouter } from '../modules/screening/screening.router';
import { CinemaRouter } from '../modules/cinema/cinema.router';
import { InvoiceRouter } from '../modules/invoice/invoice.router';
import { UserRouter } from '../modules/user/user.router';

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
  private cinemagRouter = new CinemaRouter();
  private invoiceRouter = new InvoiceRouter();
  private userRouter = new UserRouter();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.use('/user', /* authJWT, */ this.userRouter.getRoute());
    this.router.use('/movie', /* authJWT, */ this.movieRouter.getRoute());
    this.router.use('/invoice', /* authJWT, */ this.invoiceRouter.getRoute());
    this.router.use('/cinema', /* authJWT, */ this.cinemagRouter.getRoute());
    this.router.use('/theater', /* authJWT, */ this.theaterRouter.getRoute());
    this.router.use('/screening', /* authJWT, */ this.screeningRouter.getRoute());
    this.router.use('/auth', this.authRouter.getRoute());
  }

  getRoute() {
    return this.router;
  }
}
