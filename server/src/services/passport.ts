import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import User from '../models/User';

const jwtOptions: passportJwt.StrategyOptions = {
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET_JWT
};

const jwtLogin = new passportJwt.Strategy(
	jwtOptions,
	async (payload: any, done: any) => {
		const user = await User.findByPk(payload.sub);
		if (!user) {
			return done(null, false);
		}
		return done(null, user);
	}
);

passport.use(jwtLogin);
