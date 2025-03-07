import mongoose from 'mongoose';
import { TheaterI } from '../interface/theater.interface';
import { seatsSchema } from './seats.schema';
import { CinemaModel } from '../../cinema/model/cinema.model';

export const theaterSchema = new mongoose.Schema<TheaterI>(
  {
    name: { type: String, required: true },
    feature: { type: String },
    active: { type: Boolean, default: true },
    seatingPlan: {
      rows: Number,
      seatsPerRow: Number,
      layout: [{ type: seatsSchema, require: true }],
    },
    cinema: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CinemaModel.modelName,
    },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
theaterSchema.index({ name: 1 });
