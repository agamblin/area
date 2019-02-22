import tribe from '../api/tribe';
import { AUTH_USER, AUTH_ERROR, FETCH_USER, EDIT_USER } from './types';
import history from '../history';
import Axios from 'axios';

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
		history.push('/pipes');
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
	let key;
	const accessToken = getState().auth.authenticated;

	if (file) {
		key = await _uploadFile(file, accessToken);
	}

	const { data } = await tribe.put(
		'/user',
		{ ...formProps, key },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	dispatch({ type: EDIT_USER, payload: data });
};
