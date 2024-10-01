import mongoose from 'mongoose';
import { UserI } from '../interface/user.interface';
import { RoleModel } from '../role/model/role.model';

export const userSchema = new mongoose.Schema<UserI>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: mongoose.Schema.Types.ObjectId, ref: RoleModel.modelName },
    updatedAt: { type: Number },
    createdAt: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

userSchema.index({ name: 1 });
