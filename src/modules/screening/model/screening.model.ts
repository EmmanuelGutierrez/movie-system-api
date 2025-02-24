import mongoose from 'mongoose';
import { screeningSchema } from '../schema/screening.schema';

export const ScreeningModel = mongoose.model('screening', screeningSchema);
