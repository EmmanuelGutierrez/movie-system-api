import mongoose from 'mongoose';
import { MovieI } from '../interface/movie.interface';

export const movieSchema = new mongoose.Schema<MovieI >({
  name: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: [String], default: [] },
  actors: { type: [String], default: [] },
  directors: { type: [String], default: [] },
  duration: { type: Number, min: 1, required: true },
  relase: { type: Number, required: true },
});
