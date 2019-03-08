import Axios from 'axios';
import { FETCH_USER, EDIT_USER } from './types';
import tribe from '../api/tribe';
import { signout } from './auth';
import history from '../history';
import globalState from '../types/states/globalState';
import actionType from '../types/actionType';

const _uploadFile = async (file: any, accessToken: string) => {
	const uploadConfig: any = await tribe.get(
		`/users/upload/profile?filename=${file.name}&contentType=${file.type}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	const { url, key } = uploadConfig.data;
	await Axios.put(url, file, {
		headers: {
			'Content-Type': file.type
		}
	});
	return key;
};

export const fetchUser = () => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	const accessToken = getState().auth.authenticated;

	try {
		const { data } = await tribe.get('/users', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: FETCH_USER, payload: data });
	} catch (e) {
		dispatch(signout());
	}
};

export const editUser = (formProps: any, file: any) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	let avatarUrl;
	const accessToken = getState().auth.authenticated;

	if (file) {
		avatarUrl = await _uploadFile(file, accessToken);
	}

	const { data } = await tribe.put(
		'/users',
		{ ...formProps, avatarUrl },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	dispatch({ type: EDIT_USER, payload: data });
};

export const patchUser = (values: any) => async (
	dispatch: (source: actionType) => any,
	getState: () => globalState
) => {
	let avatarUrl: any = null;
	const accessToken = getState().auth.authenticated;

	if (values.file) {
		avatarUrl = await _uploadFile(values.file, accessToken);
	}
	const { data } = await tribe.patch(
		'/users',
		{
			...values,
			avatarUrl
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	dispatch({ type: EDIT_USER, payload: data });
	history.push('/');
};
