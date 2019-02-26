import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';

const GithubProvider: any = sequelize.define('GithubProvider', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default GithubProvider;
