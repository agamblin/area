import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const TrelloCard = sequelize.define('TrelloCard', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true
	},
	url: {
		type: Sequelize.STRING,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default TrelloCard;
