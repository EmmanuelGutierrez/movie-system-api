import passport, { DoneCallback } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { config } from '../../../config/config';
import { UserModel } from '../../../modules/user/model/user.model';
import { HttpException } from '../../utils/error/HttpException';
import {
  isRedisWorking,
  readDataRedis,
  writeDataRedis,
} from '../../../redis/redis-client';
import { UserToken } from '../../models/user-token.model';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.api.jwtSecret,
};

passport.use(
  new Strategy(opts, async (payload: UserToken, done) => {
    try {
      const iswokring = isRedisWorking();
      if (iswokring) {
        const key = payload.id;
        const cachedValue = await readDataRedis(key);
        if (cachedValue) {
          try {
            return done(null, JSON.parse(cachedValue));
          } catch (error) {
            return done(null, cachedValue);
          }
        } else {
          const user = await UserModel.findById(payload.id).populate('role');
          if (!user) {
            throw new HttpException('Unauthorized', 401);
          }
          writeDataRedis(key, JSON.stringify(user));
          return done(null, user);

          // next();
        }
      } else {
        console.log('no working');
        const user = await UserModel.findById(payload.id).populate("role");
        if (!user) {
          throw new HttpException('Unauthorized', 401);
        }
        return done(null, user);
      }
      const user = await UserModel.findById(payload.id);
      if (!user) {
        throw new HttpException('Unauthorized', 401);
      }
      return done(null, user);
    } catch (error) {
      console.log('jwt error', error);
      return done(error);
    }
  }),
);
