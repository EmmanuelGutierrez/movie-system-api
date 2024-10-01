import { HttpException } from '../../common/utils/error/HttpException';
import { CreateUserDto } from './dto/create-user.dto';
import { UserModel } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { RoleService } from './role/role.service';
import { roles } from '../../common/constant/role.enum';

export class UserService {
  private userModel = UserModel;
  private roleService = new RoleService();

  async creatUser({ password, ...data }: CreateUserDto) {
    try {
      const existUser = await this.userModel.exists({ email: data.email });
      if (existUser) {
        throw new HttpException('user exist', 400);
      }

      const role = await this.roleService.getByType(roles.USER);

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        ...data,
        password: hashPassword,
        role,
      });

      return user.save();
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }

  async getOneById(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        throw new HttpException('Not found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }

  async getOneByEmail(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        throw new HttpException('Not found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }

  async getOneByEmailWithPassword(id: string) {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .select('+password');
      if (!user) {
        throw new HttpException('Not found', 404);
      }
      return user;
    } catch (error: any) {
      throw new HttpException(error.message ?? 'Error', 500);
    }
  }
}
