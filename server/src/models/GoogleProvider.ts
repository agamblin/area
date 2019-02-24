import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';

const GoogleProvider = sequelize.define('GoogleProvider', {
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

export default GoogleProvider;
