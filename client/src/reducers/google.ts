import { GOOGLE_FETCH, GOOGLE_RESET, GOOGLE_ERROR } from '../actions/types';

interface googleState {
	id?: number;
	name: string;
	accessToken: string;
}

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
