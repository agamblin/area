import { Router } from 'express';
import * as authController from '../controllers/authController';
import { body } from 'express-validator/check';
import requireAuth from '../utils/requireAuth';

const router: Router = Router();

router.post(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email'),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Please enter a password of minimum 5 characters')
	],
	authController.signup
);

router.post(
	'/signin',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email'),
		body('password')
			.trim()
			.isLength({ min: 5 })
			.withMessage('Please enter a valid password')
	],
	authController.signin
);

router.post(
	'/user/edit',
	requireAuth,
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email')
	],
	authController.edit
);

router.get('/me', requireAuth, authController.healthCheck);
export default router;
