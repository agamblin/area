"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = require("../controllers/authController");
const check_1 = require("express-validator/check");
const requireAuth_1 = require("../utils/requireAuth");
const router = express_1.Router();
router.post('/signup', [
    check_1.body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    check_1.body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a password of minimum 5 characters')
], authController.signup);
router.post('/signin', [
    check_1.body('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    check_1.body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter a valid password')
], authController.signin);
router.post('/user/edit', requireAuth_1.default, [
    check_1.body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
], authController.edit);
router.get('/me', requireAuth_1.default, authController.healthCheck);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map