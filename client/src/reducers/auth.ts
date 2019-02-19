import { AUTH_USER, AUTH_ERROR, FETCH_USER, EDIT_USER } from '../actions/types';

interface authState {
	authenticated: string;
	user: {
		email: string;
		username: string;
	};
	errorMessage: string;
}
const INITIAL_STATE = {
	authenticated: '',
	user: {},
	errorMessage: ''
};

export default (state = INITIAL_STATE as authState, action: any) => {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, authenticated: action.payload.token };
		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		case FETCH_USER:
			return { ...state, user: action.payload };
		case EDIT_USER:
			return { ...state, user: action.payload };
		default:
			return state;
	}
};
