import githubMemberState from './githubMemberState';

export default interface commitState {
	id: string;
	message: string;
	author: githubMemberState;
}
