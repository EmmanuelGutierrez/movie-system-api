import { Router } from 'express';
import { MovieRouter } from '../modules/movie/movie.router';

/* const router = Router();
router.use('/movie', MovieRouter);
export const MainRouter: Router = router;
 */
export class MainRouter {
  private router = Router();
  private movieRouter = new MovieRouter();

  constructor() {
    this.initializeRouters();
  }

  private initializeRouters() {
    this.router.use('/movie', this.movieRouter.getRoute());
  }

  getRoute() {
    return this.router;
  }
}
