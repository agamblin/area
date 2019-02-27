import { Request, Response, NextFunction } from 'express';
import trello from '../api/trello';
import * as keys from '../keys';
import * as _ from 'lodash';

export const registerTrelloService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { accessToken } = req.body;
	const { data } = await trello.get(
		`/members/me?key=${keys.trelloKey}&token=${accessToken}`
	);
	if (!req.user.trelloService) {
		const provider = await req.user.createTrelloProvider({
			name: data.fullName,
			accessToken: accessToken
		});
		req.user.trelloService = true;
		await req.user.save();
		return res.status(201).json(_.pick(provider, 'id', 'name', 'accessToken'));
	}
	const err: any = new Error('A trello provider is already registered');
	err.statusCode = 401;
	return next(err);
};

export const fetchTrelloService = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.user.trelloService) {
		try {
			const trelloProvider = await req.user.getTrelloProvider();
			return res
				.status(200)
				.json(_.pick(trelloProvider, 'id', 'name', 'accessToken'));
		} catch (e) {
			return next(e);
		}
	}
	const err: any = new Error('No trello provider renseigned');
	err.statusCode = 404;
	return next(err);
};

export const resetTrelloService = async (
	req: Request,
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
