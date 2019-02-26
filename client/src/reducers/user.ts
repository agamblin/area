import {
	FETCH_USER,
	EDIT_USER,
	GOOGLE_FETCH,
	GITHUB_FETCH,
	GOOGLE_RESET,
	GITHUB_RESET
} from '../actions/types';

interface userState {
	email: string;
	username: string;
	avatarUrl: string;
	googleService: boolean;
	githubService: boolean;
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
		case GOOGLE_RESET:
			return { ...state, googleService: false };
		case GITHUB_RESET:
			return { ...state, githubService: false };
		default:
			return state;
	}
};
