"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
require('../services/passport');
exports.default = passport.authenticate('jwt', { session: false });
//# sourceMappingURL=requireAuth.js.map