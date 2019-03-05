import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const GithubRepo: any = sequelize.define('GithubRepo', {
	githubId: {
		type: Sequelize.STRING,
		allowNull: false
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
	suscribersCount: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

export default GithubRepo;
