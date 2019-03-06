import { PROJECT_CREATE, PROJECT_FETCH } from '../actions/types';
import projectState from '../types/states/projectState';

export default (state = [] as Array<projectState>, action: any) => {
	switch (action.type) {
		case PROJECT_CREATE:
			return [action.payload, ...state];
		case PROJECT_FETCH:
			return [...action.payload, ...state];
		default:
			return state;
	}
};
