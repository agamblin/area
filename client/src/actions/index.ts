import tribe from '../api/tribe';
import { AUTH_USER, AUTH_ERROR, FETCH_USER, EDIT_USER } from './types';
import history from '../history';

// AUTH
export const signUp = (formProps: any) => async (dispatch: any) => {
	try {
		const { data } = await tribe:.post('/auth/signup', {
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

	const { data } = await tribe.get('/user', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	dispatch({ type: FETCH_USER, payload: data });
};

export const editUser = (formProps: any) => async (
	dispatch: any,
	getState: any
) => {
	const accessToken = getState().auth.authenticated;

	const { data } = await tribe.put('/user', formProps, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	dispatch({ type: EDIT_USER, payload: data });
};
