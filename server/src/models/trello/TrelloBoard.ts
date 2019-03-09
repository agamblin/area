import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import trello from '../../api/trello';
import TrelloCard from './TrelloCard';
import TrelloMember from './TrelloMember';
import TrelloAction from './TrelloAction';

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
		const members = data.members.map((member: any) => {
			return {
				id: member.id,
				fullName: member.fullName,
				username: member.username,
				avatarUrl: member.avatarUrl,
				accessToken: this.accessToken,
				TrelloBoardId: this.id
			};
		});
		const activity = data.actions.map((activity: any) => {
			let targetCard = null;
			let targetMember = null;

			if (activity.data.card) {
				targetCard = activity.data.card.id;
			}
			if (activity.data.member) {
				targetMember = activity.data.member.id;
			}
			return {
				id: activity.id,
				type: activity.type,
				idTargetMember: targetMember,
				idTargetCard: targetCard,
				date: activity.date.split('T')[0],
				TrelloMemberId: activity.idMemberCreator
			};
		});

		await TrelloMember.bulkCreate(members, {
			updateOnDuplicate: ['fullName', 'username', 'avatarUrl', 'accessToken']
		});
		await TrelloCard.bulkCreate(cards, {
			updateOnDuplicate: ['name', 'description', 'accessToken']
		});
		await TrelloAction.bulkCreate(activity, { updateOnDuplicate: ['type'] });
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
