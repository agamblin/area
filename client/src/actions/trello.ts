import tribe from '../api/tribe';
import {
	TRELLO_FETCH,
	TRELLO_RESET,
	TRELLO_ERROR,
	BOARD_FETCH,
	CARD_FETCH,
	CARD_EMPTY
} from './types';
import history from '../history';
import globalState from '../types/states/globalState';
import actionType from '../types/actionType';

export const registerTrelloService = (accessTokenTrello: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.post(
			'/trello',
			{
				accessToken: accessTokenTrello
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		dispatch({ type: TRELLO_FETCH, payload: data });
		history.push('/user/profile?trello=true');
	} catch (e) {
		alert('Registration failed: Account already in use');
	}
};

export const fetchTrelloService = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.get('/trello', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: TRELLO_FETCH, payload: data });
	} catch (e) {
		dispatch({ type: TRELLO_ERROR });
	}
};

export const resetTrelloService = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		await tribe.delete('/trello', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: TRELLO_RESET });
	} catch (e) {
		alert('Failed to reset trello service');
	}
};

export const fetchBoard = (boardId: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	const accessToken = getState().auth.authenticated;

	try {
		const { data } = await tribe.get(`trello/boards/${boardId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: BOARD_FETCH, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const fetchCard = (cardId: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	const accessToken = getState().auth.authenticated;

	console.log('fetching card');
	try {
		const { data } = await tribe.get(`trello/cards/${cardId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: CARD_FETCH, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const closedCardDetails = () => {
	return { type: CARD_EMPTY };
};

export const fetchBoardCards = (boardId: number) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	const accessToken = getState().auth.authenticated;

	const { data } = await tribe.get(`trello/boards/${boardId}/cards`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	console.log(data);
};
