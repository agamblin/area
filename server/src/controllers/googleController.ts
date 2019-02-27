import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import * as _ from 'lodash';

export const registerService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accessToken, name } = req.body;

	if (!req.user.googleService) {
		try {
			const googleProvider = await req.user.createGoogleProvider({
				name,
				accessToken
			});
			req.user.googleService = true;
			await req.user.save();
			return res
				.status(201)
				.json(_.pick(googleProvider, 'id', 'name', 'accessToken'));
		} catch (err) {
			return next(err);
		}
	}
	const error: any = new Error('A google provider is already registered');
	error.statusCode = 401;
	return next(error);
};

export const fetchService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user.googleService) {
		const googleProvider = await req.user.getGoogleProvider();
		return res
			.status(200)
			.json(_.pick(googleProvider, 'id', 'name', 'accessToken'));
	}
	const err: any = new Error('No google provider rensegined');
	err.statusCode = 404;
	return next(err);
};

export const resetService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user.googleService) {
		const googleProvider = await req.user.getGoogleProvider();
		await googleProvider.destroy();
		req.user.googleService = false;
		const user = await req.user.save();
		return res.status(200).json(user);
	}
	const err: any = new Error('No provider for google renseigned');
	err.statusCode = 404;
	return next(err);
};

export const fetchFiles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user.googleService) {
		const googleProvider = await req.user.getGoogleProvider();
		const files = await googleProvider.fetchFiles();
		return res.status(200).json(files);
	}
	const err: any = new Error('No google provider renseigned');
	err.statusCode = 404;
	return next(err);
};
