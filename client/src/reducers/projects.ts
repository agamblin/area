import { PROJECT_CREATE, PROJECT_FETCH } from '../actions/types';
import projectState from '../types/states/projectState';

export default (state = [] as Array<projectState>, action: any) => {
	switch (action.type) {
		case PROJECT_CREATE:
			return [...state, action.payload];
		case PROJECT_FETCH:
			// let notPresent = true;
			// const projects = action.payload.filter((project: projectState) => {
			// 	state.forEach((savedProject: projectState) => {
			// 		if (savedProject.id === project.id) {
			// 			notPresent = false;
			// 		}
			// 	});
			// 	return notPresent;
			// });
			const parsedProjects = action.payload.map((project: projectState) => {
				const date = project.createdAt.split('T')[0];
				return { ...project, createdAt: date };
			});
			return [...parsedProjects];
		default:
			return state;
	}
};
