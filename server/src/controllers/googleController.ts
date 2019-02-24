import { Request, Response } from 'express';
import { NextFunction } from 'connect';

export const registerProvider = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accessToken, name } = req.body;

	try {
		await req.user.createGoogleProvider({
			name,
			accessToken
		});
		req.user.googleService = true;
		const user = await req.user.save();
		return res.status(200).json(user);
	} catch (err) {
		return next(err);
	}
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
