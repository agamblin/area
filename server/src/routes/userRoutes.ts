import { Router } from 'express';
import { body } from 'express-validator/check';
import * as userController from '../controllers/userController';
import validateReq from '../middlewares/validateReq';

const router: Router = Router();

router.get('/', userController.getUser);

router.put(
	'/',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email')
	],
	validateReq,
	userController.edit
);

router.patch('/', userController.patch);

router.get('/upload/profile', userController.getS3Link);

export default router;
