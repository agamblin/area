import { GITHUB_FETCH, GITHUB_RESET, GITHUB_ERROR } from '../actions/types';
import githubState from '../types/states/githubState';

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
