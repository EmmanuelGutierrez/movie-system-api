import mongoose from 'mongoose';
import { MovieI } from '../interface/movie.interface';
import { FileModel } from '../../file/model/file.model';

export const movieSchema = new mongoose.Schema<MovieI>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    genres: { type: [String], default: [] },
    actors: { type: [String], default: [] },
    directors: { type: [String], default: [] },
    duration: { type: Number, min: 1, required: true },
    release: { type: Number, required: true },
    poster: { type: mongoose.Schema.Types.ObjectId, ref: FileModel.modelName },
    active: { type: Boolean, default: true },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
movieSchema.index({ name: 1 });
