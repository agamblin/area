import { Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';
import GithubRepo from '../models/github/GithubRepo';

export const fetchService = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.githubService) {
		const githubProvider = await req.user.getGithubProvider();
		const healthState = await githubProvider.healthCheck();
		if (healthState) {
			return res
				.status(200)
				.json(_.pick(githubProvider, 'id', 'name', 'accessToken'));
		}
		const err: any = new Error(
			'Their is some problem with your account, please relog'
		);
		err.statusCode = 404;
		return next(err);
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

export const fetchRepo = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { repoId } = req.params;

	const repo = await GithubRepo.findByPk(repoId);
	const project = await repo.getProject();
	if (project.userId !== req.user.id) {
		const error: any = new Error('Unauthorized');
		error.statusCode = 401;
		return next(error);
	}
	return res.status(200).json('ok');
};
