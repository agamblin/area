import trelloBoardType from './trello/trelloBoardType';
import githubRepoType from './github/githubRepoType';
import googleDriveFolderType from './google/googleDriveFolderType';

export default interface projectType {
	id?: number;
	name: string;
	description: string;
	imageUrl?: string;
	userId?: number;
	createdAt?: string;
	GoogleDriveFolder?: googleDriveFolderType;
	GithubRepo?: githubRepoType;
	TrelloBoard?: trelloBoardType;
	triggerPrCards?: boolean;
	triggerIssuesCards?: boolean;
	triggerCardsPr?: boolean;
	createTrelloBoard?: (source: trelloBoardType) => trelloBoardType;
	createGithubRepo?: (source: githubRepoType) => githubRepoType;
	createGoogleDriveFolder?: (
		source: googleDriveFolderType
	) => googleDriveFolderType;
	getTrelloBoard?: () => trelloBoardType;
	getGithubRepo?: () => githubRepoType;
	destroy?: () => any;
	save?: () => any;
	launchPrTrelloInterval?: () => any;
	launchIssuesTrelloInterval?: () => any;
	launchCardsPrInterval?: () => any;
}
