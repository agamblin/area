import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const TrelloMember: any = sequelize.define('TrelloMember', {
	idd: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		primaryKey: true
	},
	fullName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: true
	},
	avatarUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default TrelloMember;
