import projectType from './projectType';
import googleProviderType from './google/googleProviderType';
import trelloProviderType from './trello/trelloProviderType';
import githubProviderType from './github/githubProviderType';

export default interface userType {
	id?: number;
	email: string;
	username: string;
	avatarUrl: string;
	password: string;
	googleService: boolean;
	githubService: boolean;
	trelloService: boolean;
	createProject: (source: projectType) => projectType;
	getProjects: () => Array<projectType>;
	save: () => userType;
	getGoogleProvider: () => googleProviderType;
	createGoogleProvider: (source: googleProviderType) => googleProviderType;
	getTrelloProvider: () => trelloProviderType;
	createTrelloProvider: (source: trelloProviderType) => trelloProviderType;
	getGithubProvider: () => githubProviderType;
	createGithubProvider: (source: githubProviderType) => githubProviderType;
}
