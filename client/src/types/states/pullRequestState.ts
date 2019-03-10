import githubMemberState from './githubMemberState';

export default interface pullRequestState {
	id: string;
	title: string;
	body: string;
	state: string;
	creator: githubMemberState;
	origin: string;
	target: string;
	url: string;
	updatedDate: string;
	createdDate: string;
}
