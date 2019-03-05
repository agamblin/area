import { projectType } from '../modelsType';

export interface trelloBoardType {
	id?: number;
	trelloId: string;
	name: string;
	description: string;
	url: string;
}

export interface trelloProviderType {
	id?: number;
	name: string;
	accessToken: string;
	destroy?: () => any;
	createBoard?: (source: projectType) => trelloBoardType;
}
