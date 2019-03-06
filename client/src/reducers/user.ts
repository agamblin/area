import {
	FETCH_USER,
	EDIT_USER,
	GOOGLE_FETCH,
	GOOGLE_RESET,
	GITHUB_FETCH,
	GITHUB_RESET,
	TRELLO_FETCH,
	TRELLO_RESET,
	GOOGLE_ERROR,
	GITHUB_ERROR,
	TRELLO_ERROR
} from '../actions/types';

interface userState {
	email: string;
	username: string;
	avatarUrl: string;
	googleService: boolean;
	githubService: boolean;
	trelloService: boolean;
}

export default (state = {} as userState, action: any) => {
	switch (action.type) {
		case FETCH_USER:
			return { ...state, ...action.payload };
		case EDIT_USER:
			return { ...state, ...action.payload };
		case GOOGLE_FETCH:
			return { ...state, googleService: true };
		case GITHUB_FETCH:
			return { ...state, githubService: true };
		case TRELLO_FETCH:
			return { ...state, trelloService: true };
		case GOOGLE_RESET:
			return { ...state, googleService: false };
		case GITHUB_RESET:
			return { ...state, githubService: false };
		case TRELLO_RESET:
			return { ...state, trelloService: false };
		case GOOGLE_ERROR:
			return { ...state, googleService: false };
		case GITHUB_ERROR:
			return { ...state, githubService: false };
		case TRELLO_ERROR:
			return { ...state, trelloService: false };

		default:
			return state;
	}
};
