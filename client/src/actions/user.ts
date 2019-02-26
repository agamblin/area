import Axios from 'axios';
import { FETCH_USER, EDIT_USER } from './types';
import tribe from '../api/tribe';
import { signout } from './auth';
import history from '../history';

export const fetchUser = () => async (dispatch: any, getState: any) => {
	const accessToken = getState().auth.authenticated;

	try {
		const { data } = await tribe.get('/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		dispatch({ type: FETCH_USER, payload: data });
	} catch (e) {
		dispatch(signout());
	}
};

const _uploadFile = async (file: any, accessToken: string) => {
	const uploadConfig: any = await tribe.get(
		'/user/upload/profile?filename=' + file.name,
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

export const editUser = (formProps: any, file: any) => async (
	dispatch: any,
	getState: any
) => {
	let avatarUrl;
	const accessToken = getState().auth.authenticated;

	if (file) {
		avatarUrl = await _uploadFile(file, accessToken);
	}

	const { data } = await tribe.put(
		'/user',
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
	dispatch: any,
	getState: any
) => {
	let avatarUrl: any = null;
	const accessToken = getState().auth.authenticated;

	if (values.file) {
		avatarUrl = await _uploadFile(values.file, accessToken);
	}
	const { data } = await tribe.patch(
		'/user',
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
	history.push('/pipes');
};
