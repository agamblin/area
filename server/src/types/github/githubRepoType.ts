export default interface githubRepoType {
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
