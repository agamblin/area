import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';
import User from './User';
import userType from '../types/userType';
import projectType from '../types/projectType';
import githubProviderType from '../types/github/githubProviderType';
import trelloProviderType from 'trello/trelloProviderType';
import googleProviderType from 'google/googleProviderType';
import GithubPullRequest from './github/GithubPullRequest';
import GithubRepo from './github/GithubRepo';
import githubRepoType from 'github/githubRepoType';

const Project: any = sequelize.define('Project', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	triggerPrCards: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	triggerIssuesCards: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	triggerCardsPr: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

Project.beforeCreate(async (project: projectType) => {
	const user: userType = await User.findByPk(project.userId);

	const trelloProvider: trelloProviderType = await user.getTrelloProvider();
	const githubProvider: githubProviderType = await user.getGithubProvider();
	const googleProvider: googleProviderType = await user.getGoogleProvider();

	const healthTrello = await trelloProvider.healthCheck();
	const healthGoogle = await googleProvider.healthCheck();
	const healthGithub = await githubProvider.healthCheck();

	if (!healthTrello || !healthGoogle || !healthGithub) {
		return sequelize.Promise.reject('Provider is off');
	}
	return project;
});

Project.afterCreate(async function(project: projectType) {
	const user: userType = await User.findByPk(project.userId);

	// FETCH PROVIDERS
	const trelloProvider: trelloProviderType = await user.getTrelloProvider();
	const githubProvider: githubProviderType = await user.getGithubProvider();
	const googleProvider: googleProviderType = await user.getGoogleProvider();

	// CREATE ALL RESSOURCES
	await googleProvider.createFolder(project);
	await trelloProvider.createBoard(project);
	await githubProvider.createRepo(project);
	return project;
});

async function PrTrellointervalFunc(
	projectId: number,
	repoId: string,
	repoName: string,
	accessToken: string
) {
	const project = await Project.findByPk(projectId);
	if (project.triggerPrCards) {
		console.log('Fetching requests...');
		await GithubPullRequest.fetchPullRequests(
			repoId,
			repoName,
			accessToken,
			true
		);
	} else {
		console.log('CLEARING');
		clearInterval(this);
	}
}

Project.prototype.launchPrTrelloInterval = async function() {
	const repo: githubRepoType = await GithubRepo.findOne({
		where: { ProjectId: this.id }
	});

	setInterval(
		PrTrellointervalFunc,
		15000,
		this.id,
		repo.id,
		repo.name,
		repo.accessToken
	);
};

export default Project;
