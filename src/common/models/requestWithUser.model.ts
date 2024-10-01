import { Request } from 'express';
import { UserToken } from './user-token.model';

export interface RequestWithUser {
  user: UserToken;
}
