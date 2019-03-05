import trelloBoardType from './trello/trelloBoardType';
import githubRepoType from './github/githubRepoType';

export default interface projectType {
	id?: number;
	name: string;
	description: string;
	imageUrl?: string;
	userId?: number;
	createTrelloBoard?: (source: trelloBoardType) => trelloBoardType;
	createGithubRepo?: (source: githubRepoType) => githubRepoType;
	getTrelloBoard?: () => trelloBoardType;
	getGithubRepo?: () => githubRepoType;
}
