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
	ProjectId?: number;
	getProject?: () => projectType;
	fetchInfo?: () => any;
	destroy?: () => any;
	createPullRequest?: (
		title: string,
		origin: string,
		target: string,
		body: string
	) => any;
	createIssue?: (title: string, body: string) => any;
}
