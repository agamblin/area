import { PROJECT_CREATE } from '../actions/types';

interface project {
	id?: number;
	name: string;
	description: string;
	imageUrl?: string;
	userId: number;
}

export default (state = [] as Array<project>, action: any) => {
	switch (action.type) {
		case PROJECT_CREATE:
			return [action.payload, ...state];
		default:
			return state;
	}
};
