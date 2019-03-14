import githubMemberState from './githubMemberState';
import pullRequestState from './pullRequestState';
import commitState from './commitState';
import branchState from './branchState';

export default interface repoState {
	id: string;
	htmlUrl: string;
	cloneUrl: string;
	subscribersCount: string;
	members: Array<githubMemberState>;
	pullRequests: Array<pullRequestState>;
	commits: Array<commitState>;
	branches: Array<branchState>;
}
