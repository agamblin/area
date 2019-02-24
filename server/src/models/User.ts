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
	avatarUrl: {
		type: Sequelize.STRING,
		defaultValue:
			'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	googleService: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

export default User;
