import mongoose from 'mongoose';
import { CinemaI } from '../interface/cinema.interface';

export const cinemaSchema = new mongoose.Schema<CinemaI>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    // theaters: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: TheaterModel.modelName },
    // ],
    features: [{ type: String }],
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
cinemaSchema.index({ name: 1 });
