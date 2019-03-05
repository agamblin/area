import { githubRepoType, githubProviderType } from './github/githubTypes';
import { trelloBoardType, trelloProviderType } from './trello/trelloTypes';
import { googleProviderType } from './google/googleTypes';

export interface projectType {
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

export interface userType {
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
