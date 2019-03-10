import {
	GOOGLE_FETCH,
	GOOGLE_RESET,
	GOOGLE_ERROR,
	FOLDER_FETCH,
	FILE_FETCH
} from './types';
import tribe from '../api/tribe';
import globalState from '../types/states/globalState';
import actionType from '../types/actionType';
import Axios from 'axios';

export const registerGoogleService = (googleResponse: any) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
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
		dispatch({ type: GOOGLE_FETCH, payload: data });
	} catch (e) {
		alert('Registration failed: Account already in use');
	}
};

export const fetchGoogleService = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
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
		dispatch({ type: GOOGLE_ERROR });
	}
};

export const resetGoogleService = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
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

export const fetchFolderFiles = (folderId: string) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;
		const { data } = await tribe.get(`/google/folders/${folderId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: FOLDER_FETCH, payload: data });
	} catch (err) {
		console.log(err);
	}
};

export const uploadGoogleFile = (file: any, folderId: string) => async (
	dispatch: (source: any) => any,
	getState: () => globalState
) => {
	try {
		const accessToken = getState().auth.authenticated;

		const { data } = await tribe.post(
			'/google/upload/file',
			{
				name: file.name,
				type: file.type,
				folderId
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		await Axios.patch(
			`https://www.googleapis.com/upload/drive/v3/files/${data.id}`,
			file,
			{
				headers: {
					Authorization: `Bearer ${data.accessToken}`,
					'Content-Type': file.type
				}
			}
		);
		return dispatch(fetchFolderFiles(folderId));
		// const _file = await tribe.get(`/google/files/${googleRes.data.id}`, {
		// 	headers: {
		// 		Authorization: `Bearer ${accessToken}`
		// 	}
		// });
		// dispatch({ type: FILE_FETCH, payload: _file.data });
	} catch (err) {
		console.log(err);
		return false;
	}
};
