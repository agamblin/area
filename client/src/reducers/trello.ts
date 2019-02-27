import { TRELLO_FETCH, TRELLO_RESET } from '../actions/types';

interface googleState {
	id?: number;
	name: string;
	accessToken: string;
}

export default (state = {} as googleState, action: any) => {
	switch (action.type) {
		case TRELLO_FETCH:
			return { ...state, ...action.payload };
		case TRELLO_RESET:
			return { state: {} };
		default:
			return state;
	}
};
