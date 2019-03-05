import trelloBoardType from './trello/trelloBoardType';
import githubRepoType from './github/githubRepoType';
import googleDriveFolderType from './google/googleDriveFolderType';

export default interface projectType {
	id?: number;
	name: string;
	description: string;
	imageUrl?: string;
	userId?: number;
	createTrelloBoard?: (source: trelloBoardType) => trelloBoardType;
	createGithubRepo?: (source: githubRepoType) => githubRepoType;
	createGoogleDriveFolder?: (
		source: googleDriveFolderType
	) => googleDriveFolderType;
	getTrelloBoard?: () => trelloBoardType;
	getGithubRepo?: () => githubRepoType;
}
