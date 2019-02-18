import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
	authenticated: '',
	errorMessage: ''
};

export default (state = INITIAL_STATE as any, action: any) => {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, authenticated: action.payload.token };
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};
