import { GOOGLE_FETCH, GOOGLE_RESET } from '../actions/types';

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
			console.log('hey');
			return { state: {} };
		default:
			return state;
	}
};
