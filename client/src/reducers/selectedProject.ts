import { PROJECT_FETCH, BOARD_FETCH, FOLDER_FETCH } from '../actions/types';
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
					activity: action.payload.activity.reverse(),
					members: action.payload.members,
					url: action.payload.url
				}
			};
		case FOLDER_FETCH:
			return {
				...state,
				folder: {
					...state.folder,
					files: action.payload.files
				}
			};
		default:
			return state;
	}
};
