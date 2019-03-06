import tribe from '../api/tribe';
import { GITHUB_FETCH, GITHUB_RESET, TRELLO_ERROR } from './types';

export const fetchGithubService = () => async (
	dispatch: any,
	getState: any
) => {
	try {
		const accessToken = getState().auth.authenticated;
		const { data } = await tribe.get('/github', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: GITHUB_FETCH, payload: data });
	} catch (e) {
		dispatch({ type: TRELLO_ERROR });
	}
};

export const resetGithubService = () => async (
	dispatch: any,
	getState: any
) => {
	try {
		const accessToken = getState().auth.authenticated;
		await tribe.delete('/github', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: GITHUB_RESET });
	} catch (e) {
		alert('Some error occured');
	}
};
