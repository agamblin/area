import { GOOGLE_FETCH, GOOGLE_RESET, GOOGLE_ERROR } from '../actions/types';
import googleState from '../types/states/googleState';

export default (state = {} as googleState, action: any) => {
	switch (action.type) {
		case GOOGLE_FETCH:
			return { ...state, ...action.payload };
		case GOOGLE_RESET:
			return {};
		case GOOGLE_ERROR:
			return {};
		default:
			return state;
	}
};
