import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';
import User from './User';

interface project {
	id: number;
	name: string;
	description: string;
	imageUrl?: string;
	userId: number;
}

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

Project.afterCreate(async (project: project) => {
	const user = await User.findByPk(project.userId);
	const trelloProvider = await user.getTrelloProvider();
	await trelloProvider.createNewBoard(project);
	return project;
});

export default Project;
