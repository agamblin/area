import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';

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

export default Project;
