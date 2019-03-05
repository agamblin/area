import * as AWS from 'aws-sdk';
import { Response } from 'express';
import { validationResult } from 'express-validator/check';
import { NextFunction } from 'express';
import User from '../models/User';
import * as keys from '../keys';
import { requestType } from './requestType';
import userType from '../types/userType';

const s3 = new AWS.S3({
	accessKeyId: keys.s3accessKeyId,
	secretAccessKey: keys.s3secretKey,
	signatureVersion: 'v4',
	region: 'eu-west-3'
});

export const edit = async (
	req: requestType,
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

	const { email, username, avatarUrl } = req.body;

	try {
		const user: userType = await User.findByPk(req.user.id);
		user.email = email;
		user.username = username;
		if (avatarUrl) {
			user.avatarUrl =
				'https://s3.eu-west-3.amazonaws.com/tribe-storage/' + avatarUrl;
		}
		const newUser = await user.save();
		return res.status(200).json(newUser);
	} catch (err) {
		return next(err);
	}
};

export const getUser = (req: requestType, res: Response) => {
	res.status(200).json({
		id: req.user.id,
		email: req.user.email,
		avatarUrl: req.user.avatarUrl,
		username: req.user.username,
		googleService: req.user.googleService,
		githubService: req.user.githubService,
		trelloService: req.user.trelloService
	});
};

export const patch = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { email, username, avatarUrl } = req.body;

	try {
		const user: userType = await User.findByPk(req.user.id);
		if (email) {
			user.email = email;
		}
		if (username) {
			user.username = username;
		}
		if (avatarUrl) {
			user.avatarUrl =
				'https://s3.eu-west-3.amazonaws.com/tribe-storage/' + avatarUrl;
		}
		const newUser: userType = await user.save();
		return res.status(200).json(newUser);
	} catch (err) {
		return next(err);
	}
};

export const getS3Link = (req: requestType, res: Response) => {
	const { filename, contentType } = req.query;

	const key = `${req.user.id}/profile/${filename}`;

	s3.getSignedUrl(
		'putObject',
		{
			Bucket: 'tribe-storage',
			ContentType: contentType,
			Key: key
		},
		(err, url) => {
			err;
			res.status(200).json({ key, url });
		}
	);
};
