import { GITHUB_FETCH, GITHUB_RESET } from '../actions/types';

interface githubState {
	id?: number;
	name: string;
	accessToken: string;
}

export default (state = {} as githubState, action: any) => {
	switch (action.type) {
		case GITHUB_FETCH:
			return { ...state, ...action.payload };
		case GITHUB_RESET:
			return { state: {} };
		default:
			return state;
	}
};
