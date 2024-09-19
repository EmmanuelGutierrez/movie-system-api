import mongoose from 'mongoose';
import { movieSchema } from '../schema/movie.schema';

export const MovieModel = mongoose.model('movie', movieSchema);
