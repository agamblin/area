import { GITHUB_FETCH, GITHUB_RESET, GITHUB_ERROR } from '../actions/types';

interface githubState {
	id?: number;
	name: string;
	accessToken: string;
}

export default (state = {} as githubState, action: any) => {
	switch (action.type) {
		case GITHUB_FETCH:
			return { ...state, ...action.payload };
		case GITHUB_ERROR:
			return {};
		case GITHUB_RESET:
			return {};
		default:
			return state;
	}
};
