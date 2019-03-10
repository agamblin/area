export default interface githubPullRequestType {
	id: string;
	title: string;
	body: string;
	sha: string;
	number: number;
	origin: string;
	target: string;
	url: string;
	state: string;
	userId: string;
	createdDate: string;
	updatedDate: string;
	merge: () => boolean;
}
