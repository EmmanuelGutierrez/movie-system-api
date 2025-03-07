import mongoose from 'mongoose';
import { SeatsI } from '../interface/seats.interface';
import { statusSeat } from '../../../common/constant/seat-status.enum';

export const seatsSchema = new mongoose.Schema<SeatsI>({
  number: { type: Number, required: true },
  row: { type: Number, required: true },
  status: { type: String, enum: statusSeat, default: statusSeat.AVAILABLE },
  // occupied: { type: Boolean, default: false },
});
