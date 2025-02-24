import mongoose from 'mongoose';
import { TheaterI } from '../interface/theater.interface';
import { seatsSchema } from './seats.schema';

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
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
theaterSchema.index({ name: 1 });
