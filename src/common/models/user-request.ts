import { Request } from 'express';
import { UserToken } from './user-token.model';
import { RequestWithUser } from './requestWithUser.model';
import { UserI } from '../../modules/user/interface/user.interface';

declare global {
  namespace Express {
    export interface User extends UserI {}
  }
}
