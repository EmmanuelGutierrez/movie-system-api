import mongoose from 'mongoose';
import { ScreeningI } from '../interface/screening.interface';
import { MovieModel } from '../../movie/model/movie.model';
import { seatsSchema } from '../../theater/schema/seats.schema';
import { TheaterModel } from '../../theater/model/theater.model';

export const screeningSchema = new mongoose.Schema<ScreeningI>(
  {
    name: { type: String, required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: MovieModel.modelName },
    startTime: { type: Number },
    endTime: { type: Number },
    price: { type: Number, min: 1, required: true },
    active: { type: Boolean, default: true },
    availableSeats: [{ type: seatsSchema, require: true }],
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TheaterModel.modelName,
    },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
screeningSchema.index({ name: 1 });
