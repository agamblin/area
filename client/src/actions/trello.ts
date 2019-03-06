import tribe from '../api/tribe';
import { TRELLO_FETCH, TRELLO_RESET, TRELLO_ERROR } from './types';
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
