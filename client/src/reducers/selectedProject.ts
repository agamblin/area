import { PROJECT_FETCH, BOARD_FETCH } from '../actions/types';
import selectedProjectState from '../types/states/selectedProjectState';

export default (state = {} as selectedProjectState, action: any) => {
	switch (action.type) {
		case PROJECT_FETCH:
			const date = action.payload.createdAt.split('T')[0];
			const project = { ...action.payload, createdAt: date };
			return { ...state, ...project };
		case BOARD_FETCH:
			return {
				...state,
				board: {
					...state.board,
					cards: action.payload.cards,
					url: action.payload.url
				}
			};
		default:
			return state;
	}
};
