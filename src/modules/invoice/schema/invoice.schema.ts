import mongoose from 'mongoose';
import { InvoiceI } from '../interface/invoice.interface';
import { seatsSchema } from '../../theater/schema/seats.schema';
import { ScreeningModel } from '../../screening/model/screening.model';
import { UserModel } from '../../user/model/user.model';

export const invoiceSchema = new mongoose.Schema<InvoiceI>(
  {
    screening: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ScreeningModel.modelName,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
    },
    seats: [{ type: seatsSchema, require: true }],
    totalPrice: { type: Number, required: true },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
invoiceSchema.index({ name: 1 });
