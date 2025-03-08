import mongoose from 'mongoose';
import { cinemaSchema } from '../schema/cinema.schema';

export const CinemaModel = mongoose.model('cinema', cinemaSchema);
