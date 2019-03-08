import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import trello from '../../api/trello';
import TrelloCard from './TrelloCard';

const TrelloBoard: any = sequelize.define('TrelloBoard', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
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

TrelloBoard.prototype.fetchBoard = async function() {
	const querystring = qs.stringify({
		key: keys.trelloKey,
		token: this.accessToken,
		actions: 'all',
		cards: 'all',
		checklists: 'all',
		fields:
			'name,desc,descData,closed,idOrganization,pinned,url,shortUrl,prefs,labelNames',
		labels: 'all',
		lists: 'open',
		members: 'all',
		membersInvited: 'all',
		membersInvited_fields: 'all'
	});
	try {
		const { data } = await trello.get(`/boards/${this.id}?${querystring}`);
		const cards = data.cards.map((card: any) => {
			return {
				id: card.id,
				name: card.name,
				description: card.desc,
				accessToken: this.accessToken,
				url: card.shortUrl,
				TrelloBoardId: this.id
			};
		});
		await TrelloCard.bulkCreate(cards, {
			updateOnDuplicate: ['name', 'description', 'accessToken']
		});
	} catch (e) {
		console.log(e);
	}
};

TrelloBoard.prototype.fetchCards = async function() {
	const querystring = qs.stringify({
		key: keys.trelloKey,
		token: this.accessToken,
		limit: 5,
		members: true,
		fields: 'name,desc'
	});
	try {
		const { data } = await trello.get(
			`/boards/${this.id}/cards/?${querystring}`
		);
		return data;
	} catch (e) {
		console.log(e);
	}
};

export default TrelloBoard;
