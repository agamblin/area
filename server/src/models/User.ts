import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';

const User = sequelize.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default User;
