import { Response, NextFunction } from 'express';
import trello from '../api/trello';
import * as keys from '../keys';
import * as _ from 'lodash';
import { requestType } from '../types/requestType';
import TrelloBoard from '../models/trello/TrelloBoard';
import trelloBoardType from 'trello/trelloBoardType';
import trelloCardType from 'trello/trelloCardType';
import TrelloCard from '../models/trello/TrelloCard';
import TrelloMember from '../models/trello/TrelloMember';
import trelloMemberType from 'trello/trelloMemberType';
import TrelloAction from '../models/trello/TrelloAction';

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

export const fetchBoard = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { boardId } = req.params;

	try {
		const rawBoard: trelloBoardType = await TrelloBoard.findByPk(boardId);
		await rawBoard.fetchBoard();
		const cards: Array<trelloCardType> = await TrelloCard.getFormattedCards(
			boardId
		);
		const members: Array<
			trelloMemberType
		> = await TrelloMember.getFormattedMembers(boardId);
		const activity = await TrelloAction.fetchFeed(boardId);
		return res
			.status(200)
			.json({ cards, activity, url: rawBoard.url, members });
	} catch (err) {
		return next(err);
	}
};

export const fetchCards = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { boardId } = req.params;

	try {
		const board: trelloBoardType = await TrelloBoard.findByPk(boardId);
		const cards = await board.fetchBoard();
		return res.status(200).json(cards);
	} catch (err) {
		return next(err);
	}
};

export const fetchCard = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { cardId } = req.params;

	try {
		const rawCard: trelloCardType = await TrelloCard.findByPk(cardId);
		const rawCardInfo = await rawCard.fetchInfo();
		const membersArray = await Promise.all(
			rawCardInfo.members.map(async (memberId: any) => {
				const member = await TrelloMember.findByPk(memberId.id);
				return {
					id: member.id,
					fullName: member.fullName,
					avatarUrl: member.avatarUrl
				};
			})
		);
		const cardInfo = {
			...rawCardInfo,
			members: membersArray
		};
		const card = _.pick(rawCard, 'id', 'name', 'description', 'url');
		return res.status(200).json({ ...card, ...cardInfo });
	} catch (err) {
		return next(err);
	}
};

export const fetchMember = async (
	req: requestType,
	res: Response,
	next: NextFunction
) => {
	const { memberId } = req.params;

	try {
		const member: trelloMemberType = await TrelloMember.findByPk(memberId);
		const actions = await member.getActions();
		return res.status(200).json({
			id: member.id,
			fullName: member.fullName,
			avatarUrl: member.avatarUrl,
			activity: actions
		});
	} catch (err) {
		return next(err);
	}
};
