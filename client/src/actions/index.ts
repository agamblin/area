import tribe from '../api/tribe';
import {
	AUTH_USER,
	AUTH_ERROR,
	FETCH_USER,
	EDIT_USER,
	GOOGLE_TOKEN
} from './types';
import history from '../history';
import Axios from 'axios';
import { any } from 'prop-types';

// AUTH
export const signUp = (formProps: any) => async (dispatch: any) => {
	try {
		const { data } = await tribe.post('/auth/signup', {
			email: formProps.email,
			username: formProps.username,
			password: formProps.password
		});
		localStorage.setItem('tokenTribe', data.token);
		dispatch({ type: AUTH_USER, payload: data });
		history.push('/user/details');
	} catch (e) {
		dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
	}
};

export const signIn = (formProps: any) => async (dispatch: any) => {
	try {
		const { data } = await tribe.post('/auth/signin', {
			email: formProps.email,
			password: formProps.password
		});
		localStorage.setItem('tokenTribe', data.token);
		dispatch({ type: AUTH_USER, payload: data });
		history.push('/pipes');
	} catch (e) {
		dispatch({ type: AUTH_ERROR, payload: 'Invalid credentials' });
	}
};

export const signout = () => {
	localStorage.removeItem('tokenTribe');
	history.push('/signin');
	return {
		type: AUTH_USER,
		payload: ''
	};
};

// USER
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

export const registerGoogleService = (googleResponse: any) => async (
	dispatch: any,
	getState: any
) => {
	console.log(googleResponse);
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
	dispatch({ type: GOOGLE_TOKEN, payload: data });
};
