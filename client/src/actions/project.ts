import { reset } from 'redux-form';

export const createProject = (formValues: any) => (
	dispatch: any,
	getState: any
) => {
	console.log(formValues);
	dispatch(reset('projectForm'));
};
