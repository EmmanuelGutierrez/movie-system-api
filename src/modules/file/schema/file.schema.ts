import mongoose from 'mongoose';
import { FileI } from '../interface/file.interface';

export const fileSchema = new mongoose.Schema<FileI>(
  {
    asset_id: { type: String, required: false },
    public_id: { type: String, required: true },
    format: { type: String, required: true },
    resource_type: { type: String, required: true },
    bytes: { type: Number, required: true },
    url: { type: String, required: true },
    secure_url: { type: String, required: true },
    folder: { type: String, required: true },
    original_filename: { type: String, required: false },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
// fileSchema.index({ url: 1 });
