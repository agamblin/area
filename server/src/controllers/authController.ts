import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcryptjs';

import User from '../models/User';
import { NextFunction } from 'connect';

const tokenForUser = (user: any) => {
	const timestamp = new Date().getTime();

	return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET_JWT);
};

export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		return next(error);
	}
	try {
		const { email, username, password } = req.body;
		const user: any = await User.findOne({ where: { email: req.body.email } });
		if (user) {
			return res.status(422).json({ message: 'User already exist' });
		}
		const hash = await bcrypt.hash(password, 10);
		const newUser: any = await User.create({
			email,
			username,
			password: hash
		});
		return res.status(201).json({ token: tokenForUser(newUser) });
	} catch (err) {
		return next(err);
	}
};

export const signin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error: any = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		return next(error);
	}
	const { email, password } = req.body;

	try {
		const user: any = await User.findOne({ where: { email: email } });
		if (!user) {
			const error: any = new Error('No record for you in database');
			error.statusCode = 404;
			return next(error);
		}
		const isEqual: boolean = await bcrypt.compare(password, user.password);
		if (!isEqual) {
			const error: any = new Error('Invalid password');
			error.statusCode = 401;
			return next(error);
		}
		return res.status(200).json({ token: tokenForUser(user) });
	} catch (err) {
		return next(err);
	}
};

export const healthCheck = (req: Request, res: Response) => {
	res.status(200).json({
		id: req.user.id,
		email: req.user.email,
		createdAt: req.user.createdAt
	});
};
