import mongoose from 'mongoose';
import { fileSchema } from '../schema/file.schema';

export const FileModel = mongoose.model('file', fileSchema);
