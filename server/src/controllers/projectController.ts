import { Request, Response, NextFunction } from 'express';
import * as keys from '../keys';
import * as AWS from 'aws-sdk';
import * as _ from 'lodash';

const s3 = new AWS.S3({
	accessKeyId: keys.s3accessKeyId,
	secretAccessKey: keys.s3secretKey,
	signatureVersion: 'v4',
	region: 'eu-west-3'
});

export const createProject = async (
	req: Request,
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
			.json(_.pick(project, 'id', 'name', 'description', 'imageUrl', 'userId'));
	} catch (err) {
		return next(err);
	}
};

export const getS3Link = (req: Request, res: Response) => {
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
