"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const User_1 = require("../models/User");
const jwtOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT
};
const jwtLogin = new passportJwt.Strategy(jwtOptions, (payload, done) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const user = yield User_1.default.findById(payload.sub);
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
}));
passport.use(jwtLogin);
//# sourceMappingURL=passport.js.map