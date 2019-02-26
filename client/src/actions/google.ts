import { GOOGLE_FETCH, GOOGLE_RESET } from './types';
import tribe from '../api/tribe';

export const registerGoogleService = (googleResponse: any) => async (
	dispatch: any,
	getState: any
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.post(
			'/google',
			{
				name: googleResponse.profileObj.name,
				accessToken: googleResponse.accessToken
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		console.log(data);
		dispatch({ type: GOOGLE_FETCH, payload: data });
	} catch (e) {
		alert('Registration failed: Account already in use');
	}
};

export const fetchGoogleService = () => async (
	dispatch: any,
	getState: any
) => {
	try {
		const accessToken = getState().auth.authenticated;
		const { data } = await tribe.get('/google', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: GOOGLE_FETCH, payload: data });
	} catch (e) {
		return;
	}
};

export const resetGoogleService = () => async (
	dispatch: any,
	getState: any
) => {
	try {
		console.log('RESETING');
		const accessToken = getState().auth.authenticated;
		await tribe.delete('/google', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: GOOGLE_RESET });
	} catch (e) {
		alert('Some error occured');
	}
};
