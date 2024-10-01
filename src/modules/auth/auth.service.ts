import { IsJWT } from 'class-validator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserI } from '../user/interface/user.interface';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { config } from '../../config/config';

export class AuthService {
  private readonly userSerivce = new UserService();

  generateJWT(user: UserI) {
    const payload = { email: user.email, id: user._id, role: user.role.type };
    console.log(payload);
    return sign(payload, config.api.jwtSecret, { expiresIn: '1h' });
  }

  // authentication(header:Headers){}

  async register(data: CreateUserDto) {
    const user = await this.userSerivce.creatUser(data);
    const token = this.generateJWT(user);
    return { token };
  }

  async login(user: UserI) {
    console.log('Logeando');
    const token = this.generateJWT(user);
    return { token };
  }
}
