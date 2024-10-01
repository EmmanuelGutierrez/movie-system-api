import { roles } from '../../../common/constant/role.enum';
import { HttpException } from '../../../common/utils/error/HttpException';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleModel } from './model/role.model';
import * as bcrypt from 'bcrypt';

export class RoleService {
  private roleModel = RoleModel;

  async creatRole(data: CreateRoleDto) {
    try {
      const existRole = await this.roleModel.exists({ type: data.type });
      if (existRole) {
        throw new HttpException('role exist', 400);
      }
      const role = await this.roleModel.create(data);

      return role.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }
  async getByType(type: roles) {
    const role = await this.roleModel.findOne({ type });
    if (!role) {
      throw new HttpException('Not found', 404);
    }
    return role;
  }
}
