import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';
import User from './User';
import userType from '../types/userType';
import projectType from '../types/projectType';
import githubProviderType from '../types/github/githubProviderType';
import trelloProviderType from 'trello/trelloProviderType';
import googleProviderType from 'google/googleProviderType';

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

Project.afterCreate(async (project: projectType) => {
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

export default Project;
