import { Response, NextFunction } from 'express';
import * as keys from '../keys';
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';
import Project from '../models/Project';
import projectType from 'projectType';
import TrelloBoard from '../models/trello/TrelloBoard';
import GithubRepo from '../models/github/GithubRepo';
import GoogleDriveFolder from '../models/google/GoogleDriveFolder';

const s3 = new AWS.S3({
	accessKeyId: keys.s3accessKeyId,
	secretAccessKey: keys.s3secretKey,
	signatureVersion: 'v4',
	region: 'eu-west-3'
});

export const createProject = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	let pathImage: string;
	const { name, description, imageUrl } = req.body;

	if (
		!req.user.googleService ||
		!req.user.trelloService ||
		!req.user.githubService
	) {
		const err: any = new Error(
			'You have to be connected to github, trello et google to proceed'
		);
		err.statusCode = 401;
		return next(err);
	}
	if (imageUrl) {
		pathImage = 'https://s3.eu-west-3.amazonaws.com/tribe-storage/' + imageUrl;
	}
	try {
		const project = await req.user.createProject({
			name,
			description,
			imageUrl: pathImage
		});
		return res
			.status(201)
			.json(
				_.pick(
					project,
					'id',
					'name',
					'description',
					'imageUrl',
					'userId',
					'createdAt'
				)
			);
	} catch (err) {
		return next(err);
	}
};

export const getProjects = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	try {
		const rawProjects = await req.user.getProjects();
		const listProjects = rawProjects.map(project => {
			return _.pick(
				project,
				'id',
				'name',
				'description',
				'imageUrl',
				'userId',
				'triggerPrCards',
				'triggerIssuesCards',
				'triggerCardsPr',
				'createdAt'
			);
		});
		return res.status(200).json(listProjects);
	} catch (err) {
		return next(err);
	}
};

export const getProject = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { projectId } = req.params;

	const project: projectType = await Project.findByPk(projectId, {
		include: [TrelloBoard, GoogleDriveFolder, GithubRepo]
	});

	if (project.userId !== req.user.id) {
		const err: any = new Error('You do not have access to this project');
		err.statusCode = 401;
		return next(err);
	}

	return res.status(200).json({
		..._.pick(
			project,
			'id',
			'name',
			'description',
			'imageUrl',
			'userId',
			'triggerPrCards',
			'triggerIssuesCards',
			'triggerCardsPr',
			'createdAt'
		),
		board: _.pick(project.TrelloBoard, 'id'),
		repo: _.pick(project.GithubRepo, 'id', 'githubId'),
		folder: _.pick(project.GoogleDriveFolder, 'id', 'googleId')
	});
};

export const getS3Link = (req: requestType, res: Response) => {
	const { filename, contentType } = req.query;
	const key = `${req.user.id}/projects/${filename}`;

	s3.getSignedUrl(
		'putObject',
		{
			Bucket: 'tribe-storage',
			ContentType: contentType,
			Key: key
		},
		(err, url) => {
			if (err) {
				console.log(err);
			}
			res.status(200).json({ key, url });
		}
	);
};

export const githubPrTrigger = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { value } = req.body;
	const { projectId } = req.params;

	try {
		const project: projectType = await Project.findByPk(projectId);
		project.triggerPrCards = value;
		if (value === true) {
			project.launchPrTrelloInterval();
		}
		await project.save();

		return res.status(201).json(value);
	} catch (err) {
		return next(err);
	}
};

export const githubIssuesTrigger = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { value } = req.body;
	const { projectId } = req.params;

	try {
		const project: projectType = await Project.findByPk(projectId);
		project.triggerIssuesCards = value;
		await project.save();
		if (value === true) {
			project.launchIssuesTrelloInterval();
		}
		return res.status(201).json(value);
	} catch (err) {
		return next(err);
	}
};

export const trelloCardsPrTrigger = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { value } = req.body;
	const { projectId } = req.params;

	try {
		const project: projectType = await Project.findByPk(projectId);
		project.triggerCardsPr = value;
		await project.save();
		if (value === true && !project.triggerCardsIssue) {
			project.launchCardsInterval();
		}
		return res.status(201).json(value);
	} catch (err) {
		return next(err);
	}
};

export const trelloCardsIssueTrigger = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { value } = req.body;
	const { projectId } = req.params;

	try {
		const project: projectType = await Project.findByPk(projectId);
		project.triggerCardsIssue = value;
		await project.save();
		if (value === true && !project.triggerCardsPr) {
			project.launchCardsInterval();
		}
		return res.status(201).json(value);
	} catch (err) {
		return next(err);
	}
};
