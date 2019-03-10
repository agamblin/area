import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const GithubMember: any = sequelize.define('GithubMember', {
	githubId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	avatarUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	admin: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});

export default GithubMember;
