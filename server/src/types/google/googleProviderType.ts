import projectType from 'projectType';

export default interface googleProviderType {
	id?: number;
	name: string;
	accessToken: string;
	destroy?: () => any;
	createFolder?: (source: projectType) => any;
	fetchFiles?: () => any;
}
