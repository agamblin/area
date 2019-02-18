import tribe from '../api/tribe';
import { AUTH_USER, AUTH_ERROR } from './types';
import history from '../history';

export const signUp = (formProps: any) => async (dispatch: any) => {
	try {
		console.log(formProps);
		const { data } = await tribe.post('/signup', {
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
	console.log(formProps);
	try {
		const { data } = await tribe.post('/signin', {
			email: formProps.email,
			password: formProps.password
		});
		localStorage.setItem('tokenTribe', data.token);
		dispatch({ type: AUTH_USER, payload: data });
		history.push('/pipes');
	} catch (e) {
		console.log('ERROR');
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
