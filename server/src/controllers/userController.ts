import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';

import User from '../models/User';
import { NextFunction } from 'connect';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		return next(error);
	}

	const { email, username } = req.body;
	console.log(email, username);
	try {
		const user: any = await User.findByPk(req.user.id);
		user.email = email;
		user.username = username;
		const newUser = await user.save();
		return res.status(200).json(newUser);
	} catch (err) {
		return next(err);
	}
};

export const getUser = (req: Request, res: Response) => {
	res.status(200).json({
		id: req.user.id,
		email: req.user.email,
		username: req.user.username,
		createdAt: req.user.createdAt
	});
};
