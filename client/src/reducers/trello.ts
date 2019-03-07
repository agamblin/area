import { TRELLO_FETCH, TRELLO_RESET, TRELLO_ERROR } from '../actions/types';
import trelloState from '../types/states/trelloState';

export default (state = {} as trelloState, action: any) => {
	switch (action.type) {
		case TRELLO_FETCH:
			return { ...state, ...action.payload };
		case TRELLO_RESET:
			return { state: {} };
		case TRELLO_ERROR:
			return {};
		default:
			return state;
	}
};
