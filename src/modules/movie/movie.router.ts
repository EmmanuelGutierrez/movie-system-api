import { Router } from 'express';
import { createMovieController } from './movie.controller';
import { CreateMovieDto } from './dto/create-movie.dto';
import { validationHandler } from '../../common/utils/validationHandler';

const router = Router();

router.post(
  '/create',
  validationHandler(CreateMovieDto),
  createMovieController,
);

export const MovieRouter = router;
