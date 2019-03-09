import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import * as _ from 'lodash';
import trello from '../../api/trello';

const TrelloCard: any = sequelize.define('TrelloCard', {
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

TrelloCard.prototype.fetchInfo = async function() {
	const querystring = qs.stringify({
		attachments: true,
		attachment_fields: 'all',
		key: keys.trelloKey,
		token: this.accessToken,
		fields: 'all',
		members: true,
		member_fields: 'id',
		list: true,
		stickers: true,
		sticker_fields: 'all'
	});
	try {
		const { data } = await trello.get(`/cards/${this.id}?${querystring}`);
		const rawCard = _.pick(
			data,
			'due',
			'labels',
			'members',
			'dateLastActivity'
		);
		const card = {
			...rawCard,
			labels: rawCard.labels.map(label => {
				return { id: label.id, name: label.name, color: label.color };
			})
		};
		return card;
	} catch (err) {
		console.log(err);
		return null;
	}
};

export default TrelloCard;
