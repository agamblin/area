import { Response, NextFunction } from 'express';
import trello from '../api/trello';
import * as keys from '../keys';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';

export const registerTrelloService = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { accessToken } = req.body;
	const { data } = await trello.get(
		`/members/me?key=${keys.trelloKey}&token=${accessToken}`
	);
	if (!req.user.trelloService) {
		const trelloProvider = await req.user.createTrelloProvider({
			name: data.fullName,
			accessToken: accessToken
		});
		req.user.trelloService = true;
		await req.user.save();
		return res
			.status(201)
			.json(_.pick(trelloProvider, 'id', 'name', 'accessToken'));
	}
	const err: any = new Error('A trello provider is already registered');
	err.statusCode = 401;
	return next(err);
};

export const fetchTrelloService = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.trelloService) {
		try {
			const trelloProvider = await req.user.getTrelloProvider();
			const healthState = await trelloProvider.healthCheck();
			if (healthState) {
				return res
					.status(200)
					.json(_.pick(trelloProvider, 'id', 'name', 'accessToken'));
			}
			const err: any = new Error(
				'Their is some problem with your account, please relog.'
			);
			err.statusCode = 404;
			err.message = 'Their is some problem with your account, please relog';
			return next(err);
		} catch (e) {
			return next(e);
		}
	}
	const err: any = new Error('No trello provider renseigned');
	err.statusCode = 404;
	return next(err);
};

export const resetTrelloService = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	if (req.user.trelloService) {
		const trelloProvider = await req.user.getTrelloProvider();
		await trelloProvider.destroy();
		req.user.trelloService = false;
		const user = await req.user.save();
		return res.status(200).json(user);
	}
	const err: any = new Error('No provider for trello renseigned');
	err.statusCode = 404;
	return next(err);
};
