import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import trello from '../../api/trello';

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
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

TrelloBoard.prototype.fetchCards = async function() {
	const querystring = qs.stringify({
		key: keys.trelloKey,
		token: this.accessToken,
		limit: 5,
		members: true,
		fields: 'name'
	});
	console.log('trelloBoard');
	try {
		const { data } = await trello.get(
			`/boards/${this.trelloId}/cards/?${querystring}`
		);
		console.log(data);
	} catch (e) {
		console.log(e);
	}
};

export default TrelloBoard;
