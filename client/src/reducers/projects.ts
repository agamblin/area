import { PROJECT_CREATE, PROJECTS_FETCH } from '../actions/types';
import projectState from '../types/states/projectState';

export default (state = [] as Array<projectState>, action: any) => {
	switch (action.type) {
		case PROJECT_CREATE:
			const date = action.payload.createdAt.split('T')[0];
			const project = { ...action.payload, createdAt: date };
			return [...state, project];
		case PROJECTS_FETCH:
			const parsedProjects = action.payload.map((project: projectState) => {
				const date = project.createdAt.split('T')[0];
				return { ...project, createdAt: date };
			});
			return [...parsedProjects];
		default:
			return state;
	}
};
