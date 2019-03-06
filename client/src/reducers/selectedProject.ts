import { PROJECT_FETCH } from '../actions/types';
import projectState from '../types/states/projectState';

export default (state = {} as projectState, action: any) => {
	switch (action.type) {
		case PROJECT_FETCH:
			const date = action.payload.createdAt.split('T')[0];
			const project = { ...action.payload, createdAt: date };
			return { ...state, ...project };
		default:
			return state;
	}
};
