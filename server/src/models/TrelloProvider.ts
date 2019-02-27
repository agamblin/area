import sequelize from '../utils/database';
import * as Sequelize from 'sequelize';

const TrelloProvider: any = sequelize.define('TrelloProvider', {
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

export default TrelloProvider;
