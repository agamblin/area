import { PROJECT_FETCH } from '../actions/types';
import selectedProjectState from '../types/states/selectedProjectState';

export default (state = {} as selectedProjectState, action: any) => {
	switch (action.type) {
		case PROJECT_FETCH:
			const date = action.payload.createdAt.split('T')[0];
			const project = { ...action.payload, createdAt: date };
			return { ...state, ...project };
		default:
			return state;
	}
};
