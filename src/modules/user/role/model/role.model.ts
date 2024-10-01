import mongoose from 'mongoose';
import { roleSchema } from '../schema/role.schema';

export const RoleModel = mongoose.model('role', roleSchema);

module.exports = { RoleModel };
