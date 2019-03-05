import projectType from 'projectType';

export default interface googleProviderType {
	id?: number;
	name: string;
	accessToken: string;
	userId?: number;
	destroy?: () => any;
	createFolder?: (source: projectType) => any;
	fetchFiles?: () => any;
	healthCheck?: () => boolean;
}
