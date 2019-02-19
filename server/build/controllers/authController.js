"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const check_1 = require("express-validator/check");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const User_1 = require("../models/User");
const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET_JWT);
};
exports.signup = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    try {
        const { email, username, password } = req.body;
        const user = yield User_1.default.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(422).json({ message: 'User already exist' });
        }
        const hash = yield bcrypt.hash(password, 10);
        const newUser = yield User_1.default.create({
            email,
            username,
            password: hash
        });
        return res.status(201).json({ token: tokenForUser(newUser) });
    }
    catch (err) {
        return next(err);
    }
});
exports.signin = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error('No record for you in database');
            error.statusCode = 404;
            return next(error);
        }
        const isEqual = yield bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            return next(error);
        }
        return res.status(200).json({ token: tokenForUser(user) });
    }
    catch (err) {
        return next(err);
    }
});
exports.edit = (req, res, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        return next(error);
    }
    console.log('EDITING');
    const { email, username } = req.body;
    console.log(email, username);
    try {
        const user = yield User_1.default.findByPk(req.user.id);
        user.email = email;
        user.username = username;
        const newUser = yield user.save();
        return res.status(200).json(newUser);
    }
    catch (err) {
        return next(err);
    }
});
exports.healthCheck = (req, res) => {
    res.status(200).json({
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        createdAt: req.user.createdAt
    });
};
//# sourceMappingURL=authController.js.map