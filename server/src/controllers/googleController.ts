import { Response } from 'express';
import { NextFunction } from 'connect';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';
import googleDrive from '../api/googleDrive';
import GoogleDriveFolder from '../models/google/GoogleDriveFolder';
import googleDriveFolderType from 'google/googleDriveFolderType';
import GoogleProvider from '../models/google/GoogleProvider';
import googleDriveFile from '../models/google/GoogleDriveFile';

export const registerService = async (
	req: requestType,
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
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.googleService) {
		const googleProvider = await req.user.getGoogleProvider();
		const healthState = await googleProvider.healthCheck();
		if (healthState) {
			return res
				.status(200)
				.json(_.pick(googleProvider, 'id', 'name', 'accessToken'));
		}
		const err: any = new Error(
			'Their is some problem with your account, please relog'
		);
		err.statusCode = 404;
		return next(err);
	}
	const err: any = new Error('No google provider rensegined');
	err.statusCode = 404;
	return next(err);
};

export const resetService = async (
	req: requestType,
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
	req: requestType,
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

export const fetchFolder = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { folderId } = req.params;

	try {
		const folder: googleDriveFolderType = await GoogleDriveFolder.findByPk(
			folderId
		);
		await folder.fetchFiles();
		const files = await folder.getGoogleDriveFiles({
			attributes: [
				'id',
				'name',
				'downloadUrl',
				'contentUrl',
				'iconUrl',
				'thumbnailUrl',
				'createdDate',
				'modifiedDate',
				'fileExtension',
				'size'
			]
		});
		return res.status(200).json({ id: folderId, files });
	} catch (err) {
		return next(err);
	}
};

export const uploadGoogleFile = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { name, type, folderId } = req.body;

	try {
		const googleProvider = await GoogleProvider.findOne({
			where: { userId: req.user.id }
		});

		const { data } = await googleDrive.post(
			'/files',
			{
				name,
				mimeType: type,
				parents: [folderId]
			},
			{
				headers: {
					Authorization: `Bearer ${googleProvider.accessToken}`
				}
			}
		);
		const folder: googleDriveFolderType = await GoogleDriveFolder.findByPk(
			folderId
		);
		await folder.fetchFiles();
		return res
			.status(201)
			.json({ ...data, accessToken: googleProvider.accessToken });
	} catch (err) {
		return next(err);
	}
};

export const fetchFile = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { fileId } = req.params;

	try {
		const file = await googleDriveFile.findByPk(fileId);
		return res
			.status(200)
			.json(
				_.pick(
					file,
					'id',
					'name',
					'downloadUrl',
					'contentUrl',
					'iconUrl',
					'thumbnailUrl',
					'createdDate',
					'modifiedDate',
					'fileExtension',
					'size'
				)
			);
	} catch (err) {
		return next(err);
	}
};
