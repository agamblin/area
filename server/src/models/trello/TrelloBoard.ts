import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import trello from '../../api/trello';
import TrelloCard from './TrelloCard';
import TrelloMember from './TrelloMember';
import TrelloAction from './TrelloAction';
import TrelloList from './TrelloList';
import trelloListType from 'trello/trelloListType';

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
		const lists = data.lists.map((list: any) => {
			return {
				id: list.id,
				name: list.name,
				TrelloBoardId: this.id
			};
		});
		await TrelloList.bulkCreate(lists, { updateOnDuplicate: ['name'] });
		const cards = data.cards.map((card: any) => {
			return {
				id: card.id,
				name: card.name,
				description: card.desc,
				accessToken: this.accessToken,
				listId: card.idList,
				url: card.shortUrl,
				TrelloBoardId: this.id
			};
		});
		await TrelloCard.bulkCreate(cards, {
			updateOnDuplicate: ['name', 'description', 'listId', 'accessToken']
		});
		const members = data.members.map((member: any) => {
			return {
				trelloId: member.id,
				fullName: member.fullName,
				username: member.username,
				avatarUrl: member.avatarUrl,
				accessToken: this.accessToken,
				TrelloBoardId: this.id
			};
		});
		await TrelloMember.createMultiple(this.id, members);
		const activity = await Promise.all(
			data.actions.map(async (activity: any) => {
				let targetCard = null;
				let targetMember = null;

				if (activity.data.card) {
					targetCard = activity.data.card.id;
				}
				if (activity.data.member) {
					targetMember = activity.data.member.id;
				}

				const creator = await TrelloMember.findOne({
					where: { trelloBoardId: this.id, trelloId: activity.idMemberCreator }
				});
				return {
					id: activity.id,
					type: activity.type,
					idTargetMember: targetMember,
					idTargetCard: targetCard,
					date: activity.date.split('T')[0],
					TrelloMemberId: creator.id,
					TrelloBoardId: this.id
				};
			})
		);
		await TrelloAction.bulkCreate(activity, { updateOnDuplicate: ['type'] });
	} catch (e) {
		console.log(e);
	}
};

TrelloBoard.prototype.createNewCard = async function(
	title: string,
	body?: string,
	url?: string
) {
	const list: trelloListType = await TrelloList.findOne({
		where: { TrelloBoardId: this.id, name: 'To Do' }
	});

	const querystring = qs.stringify({
		name: title,
		desc: body,
		urlSource: url,
		idList: list.id,
		pos: 'top',
		key: keys.trelloKey,
		token: this.accessToken
	});
	try {
		await trello.post(`cards?${querystring}`);
	} catch (err) {
		console.log(err);
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
