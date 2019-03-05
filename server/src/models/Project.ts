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

Project.afterCreate(async (project: projectType) => {
	const user: userType = await User.findByPk(project.userId);

	// FETCH PROVIDERS
	const trelloProvider: trelloProviderType = await user.getTrelloProvider();
	const githubProvider: githubProviderType = await user.getGithubProvider();
	const googleProvider: googleProviderType = await user.getGoogleProvider();

	// CREATE ALL RESSOURCES
	const folder = await googleProvider.createFolder(project);
	const board = await trelloProvider.createBoard(project);
	const repo = await githubProvider.createRepo(project);

	if (!repo) {
		user.githubService = false;
		await githubProvider.destroy();
	}
	if (!board) {
		user.trelloService = false;
		await trelloProvider.destroy();
	}
	if (!folder) {
		user.googleService = false;
		await googleProvider.destroy();
	}
	if (!folder || !board || !repo) {
		await user.save();
	}
	return project;
});

export default Project;
