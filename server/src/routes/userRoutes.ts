import { Router } from 'express';
import { body } from 'express-validator/check';
import * as userController from '../controllers/userController';

const router: Router = Router();

router.get('/', userController.getUser);

router.put(
	'/',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email')
	],
	userController.edit
);

export default router;
