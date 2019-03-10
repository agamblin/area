import projectType from 'projectType';

export default interface githubRepoType {
	id: string;
	nodeId: string;
	name: string;
	description: string;
	private: boolean;
	htmlUrl: string;
	cloneUrl: string;
	subscribersCount: number;
	accessToken: string;
	getProject?: () => projectType;
	fetchInfo?: () => any;
	destroy?: () => any;
}
