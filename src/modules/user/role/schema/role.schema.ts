import mongoose from 'mongoose';
import { RoleI } from '../interface/role.interface';
import { roles } from '../../../../common/constant/role.enum';

export const roleSchema = new mongoose.Schema<RoleI>(
  {
    type: { type: String, required: true, enum: roles, unique: true },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);
