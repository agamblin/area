import { CARD_FETCH, CARD_EMPTY } from '../actions/types';
import selectedCardState from '../types/states/selectedCardState';

export default (state = {} as selectedCardState, action: any) => {
	switch (action.type) {
		case CARD_FETCH:
			let due = null;
			let dateLastActivity = null;

			if (action.payload.due) {
				due = action.payload.due.split('T')[0];
			}
			if (action.payload.dateLastActivity) {
				dateLastActivity = action.payload.dateLastActivity.split('T')[0];
			}
			const card = { ...action.payload, due, dateLastActivity };
			return { ...state, ...card };
		case CARD_EMPTY:
			return {};
		default:
			return state;
	}
};
