import { Request } from 'express';
import { UserI } from '../../modules/user/interface/user.interface';
import * as core from 'express-serve-static-core';

export interface RequestAuth<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = Record<string, any>,
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  user: UserI;
}
