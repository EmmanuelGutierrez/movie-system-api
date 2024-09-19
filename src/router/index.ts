import { Router } from 'express';
import { MovieRouter } from '../modules/movie/movie.router';

const router = Router();
router.use('/movie', MovieRouter);
export const MainRouter: Router = router;
