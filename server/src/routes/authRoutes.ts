import { Router } from 'express';
import * as authController from '../controllers/authController';
import { body } from 'express-validator/check';

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

router.get('/oauth/github/callback', authController.githubOauth);

router.get('/oauth/trello/callback', authController.trelloOauth);

export default router;
