import mongoose from 'mongoose';
import { SeatsI } from '../interface/seats.interface';

export const seatsSchema = new mongoose.Schema<SeatsI>({
  number: { type: Number, required: true },
  row: { type: Number, required: true },
  occupied: { type: Boolean, default: false },
});
