import passport from 'passport';
import { HttpException } from '../utils/error/HttpException';
import { Strategy } from 'passport-local';
import { UserModel } from '../../modules/user/model/user.model';
import * as bcrypt from 'bcrypt';

/* passport.use(
  new Strategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      console.log('local 1');
      try {
        const user = await UserModel.findOne({ email }).select('+password');
        console.log('local 2');
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
); */

export const authLocal = passport.authenticate('local', { session: false });
