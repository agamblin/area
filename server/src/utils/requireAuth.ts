import * as passport from 'passport';
require('../services/passport');

export default passport.authenticate('jwt', { session: false });
