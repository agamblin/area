import { reset } from 'redux-form';
import tribe from '../api/tribe';
import Axios from 'axios';
import { PROJECT_CREATE } from './types';

const _uploadFile = async (file: any, accessToken: string) => {
	const uploadConfig: any = await tribe.get(
		`/projects/upload/image?filename=${file.name}&contentType=${file.type}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		}
	);
	const { url, key } = uploadConfig.data;
	await Axios.put(url, file, {
		headers: {
			'Content-Type': file.type
		}
	});
	return key;
};

export const createProject = (formValues: any, file: any) => async (
	dispatch: any,
	getState: any
) => {
	let imageUrl: any = null;
	const accessToken = getState().auth.authenticated;

	try {
		if (file) {
			imageUrl = await _uploadFile(file, accessToken);
		}
		const { data } = await tribe.post(
			'/projects',
			{
				...formValues,
				imageUrl
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);
		dispatch(reset('projectForm'));
		dispatch({ type: PROJECT_CREATE, payload: data });
	} catch (err) {
		console.log(err);
		alert('You have to be logged to google, github and trello to proceed');
	}
};
