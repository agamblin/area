import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import User from '../models/User';
import * as keys from '../keys';
import userType from '../types/userType';

const jwtOptions: passportJwt.StrategyOptions = {
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.jwtSecret
};

const jwtLogin = new passportJwt.Strategy(
	jwtOptions,
	async (payload: any, done: any) => {
		const user: userType = await User.findByPk(payload.sub);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	}
);

passport.use(jwtLogin);
