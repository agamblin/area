import { Response, NextFunction } from 'express';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';
import GithubRepo from '../models/github/GithubRepo';
import githubRepoType from 'github/githubRepoType';
import GithubPullRequest from '../models/github/GithubPullRequest';

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

	try {
		const repo: githubRepoType = await GithubRepo.findByPk(repoId);
		const project = await repo.getProject();
		if (project.userId !== req.user.id) {
			const error: any = new Error('Unauthorized');
			error.statusCode = 401;
			return next(error);
		}
		const data = await repo.fetchInfo();

		return res.status(200).json({
			..._.pick(repo, 'htmlUrl', 'cloneUrl', 'subscribersCount'),
			...data
		});
	} catch (err) {
		return next(err);
	}
};

export const mergeRequest = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { pullRequestId } = req.params;

	try {
		const pullRequest = await GithubPullRequest.findByPk(pullRequestId);
		const ok = await pullRequest.merge();
		if (ok) {
			return res.status(200).json('Merged');
		}
		return res.status(500).json('Failed');
	} catch (err) {
		return next(err);
	}
};
