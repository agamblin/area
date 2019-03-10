import {
	PROJECT_FETCH,
	BOARD_FETCH,
	FOLDER_FETCH,
	FILE_FETCH,
	PROJECT_CLEAR,
	REPO_FETCH,
	REPO_MERGE
} from '../actions/types';
import selectedProjectState from '../types/states/selectedProjectState';

export default (state = {} as selectedProjectState, action: any) => {
	switch (action.type) {
		case PROJECT_CLEAR:
			return {};
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
		case REPO_FETCH:
			return {
				...state,
				repo: {
					...state.repo,
					...action.payload
				}
			};
		case REPO_MERGE: {
			const pullRequests = state.repo.pullRequests.map(pullRequest => {
				if (pullRequest.id === action.payload) {
					return {
						...pullRequest,
						state: 'closed'
					};
				}
				return { ...pullRequest };
			});
			return {
				...state,
				repo: {
					...state.repo,
					pullRequests
				}
			};
		}
		case FILE_FETCH:
			return {
				...state,
				folder: {
					files: [...state.folder.files, action.payload]
				}
			};
		default:
			return state;
	}
};
