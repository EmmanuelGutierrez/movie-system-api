import mongoose from 'mongoose';
import { theaterSchema } from '../schema/theater.schema';

export const TheaterModel = mongoose.model('theater', theaterSchema);
