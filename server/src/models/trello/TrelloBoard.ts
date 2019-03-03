import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';

const TrelloBoard: any = sequelize.define('TrelloBoard', {
	trelloId: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

export default TrelloBoard;
