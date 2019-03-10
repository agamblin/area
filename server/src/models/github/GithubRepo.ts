import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const GithubRepo: any = sequelize.define('GithubRepo', {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	nodeId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	private: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	htmlUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cloneUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subscribersCount: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default GithubRepo;
