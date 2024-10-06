import passport, { DoneCallback } from 'passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { config } from '../../../config/config';
import { UserModel } from '../../../modules/user/model/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
import { HttpException } from '../../utils/error/HttpException';
import * as bcrypt from 'bcrypt';

// const opts: StrategyOptionsWithRequest = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.api.jwtSecret,
//   passReqToCallback: true,
// };

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email })
          .select('+password')
          .populate('role');
        if (!user) {
          throw new HttpException('Incorrect email or password', 404);
        }
        const isAuth = bcrypt.compareSync(password, user.password);
        if (!isAuth) {
          throw new HttpException('Incorrect email or password', 404);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
