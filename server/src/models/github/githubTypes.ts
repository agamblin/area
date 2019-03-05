import { projectType } from '../modelsType';
export interface githubRepoType {
	id?: number;
	githubId: string;
	nodeId: string;
	name: string;
	description: string;
	private: boolean;
	htmlUrl: string;
	cloneUrl: string;
	subscribersCount: number;
}

export interface githubProviderType {
	id?: number;
	name: string;
	accessToken: string | string[];
	createRepo?: (source: projectType) => githubRepoType;
	destroy?: () => any;
}
