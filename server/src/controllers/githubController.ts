import { Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { requestType } from './requestType';

export const getInfoAboutService = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.githubService) {
		const githubProvider = await req.user.getGithubProvider();
		return res
			.status(200)
			.json(_.pick(githubProvider, 'id', 'name', 'accessToken'));
	}
	const error: any = new Error('No provider for github renseigned');
	error.statusCode = 404;
	return next(error);
};

export const removeProvider = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.githubService) {
		const githubProvider = await req.user.getGithubProvider();
		await githubProvider.destroy();
		req.user.githubService = false;
		const user = await req.user.save();
		return res.status(200).json(user);
	}
	const err: any = new Error('No provider for github renseigned');
	err.statusCode = 404;
	return next(err);
};
