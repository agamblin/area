export default interface githubIssueType {
	id: string;
	url: string;
	state: string;
	number: number;
	title: string;
	body?: string;
	GithubRepoId: string;
}
