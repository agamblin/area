import tribe from '../api/tribe';
import {
	GITHUB_FETCH,
	GITHUB_RESET,
	TRELLO_ERROR,
	REPO_FETCH,
	REPO_MERGE
} from './types';
import globalState from '../types/states/globalState';
import actionType from '../types/actionType';

export const fetchGithubService = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
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
	dispatch: (source: actionType) => any,
	getState: () => globalState
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

export const fetchRepo = (repoId: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.get(`/github/repos/${repoId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: REPO_FETCH, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const executeMergeRequest = (pullRequestId: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.get(`/github/pullrequests/${pullRequestId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: REPO_MERGE, payload: pullRequestId });
	} catch (err) {
		console.log(err);
	}
};
