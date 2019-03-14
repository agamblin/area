import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as qs from 'query-string';
import * as keys from '../../keys';
import * as _ from 'lodash';
import trello from '../../api/trello';
import trelloCardType from 'trello/trelloCardType';
import TrelloList from './TrelloList';
import TrelloMember from './TrelloMember';
import TrelloBoard from './TrelloBoard';
import projectType from 'projectType';
import trelloBoardType from 'trello/trelloBoardType';
import githubRepoType from 'github/githubRepoType';

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
	listId: {
		type: Sequelize.STRING,
		allowNull: false
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

TrelloCard.getFormattedCards = async function(boardId: string) {
	const rawCards: Array<trelloCardType> = await this.findAll({
		where: { TrelloBoardId: boardId }
	});
	const cards = await Promise.all(
		rawCards.map(async card => {
			const list = await TrelloList.findByPk(card.listId);
			return {
				id: card.id,
				name: card.name,
				description: card.description,
				url: card.url,
				list: list.name
			};
		})
	);
	return cards;
};

TrelloCard.createMultiple = async function(cards: Array<trelloCardType>) {
	await Promise.all(
		cards.map(async card => {
			const existing = await this.findByPk(card.id);
			if (!existing) {
				this.create(card);
			} else {
				this.upsert(card);
			}
		})
	);
};

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
		const members = await Promise.all(
			rawCard.members.map(async (member: any) => {
				const memberInfo = await TrelloMember.findOne({
					where: { trelloId: member.id, TrelloBoardId: this.TrelloBoardId }
				});
				return {
					id: memberInfo.id,
					fullName: memberInfo.fullName,
					avatarUrl: memberInfo.avatarUrl
				};
			})
		);
		const card = {
			...rawCard,
			members,
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

TrelloCard.afterCreate(async (card: trelloCardType) => {
	const board: trelloBoardType = await TrelloBoard.findByPk(card.TrelloBoardId);
	const project: projectType = await board.getProject();
	const repo: githubRepoType = await project.getGithubRepo();
	const firstSplit = card.name.split(':');

	if (firstSplit[0] === 'PR' && project.triggerCardsPr) {
		const secondSplit = firstSplit[1].split('(');
		const name = secondSplit[0];
		const branches = secondSplit[1];
		const origin = branches.split('=>')[0].trim();
		const targetRaw = branches.split('=>')[1];
		const target = targetRaw.split(')')[0].trim();
		if (name && origin && target) {
			await repo.createPullRequest(name, origin, target, card.url);
		}
	} else if (firstSplit[0] === 'FIX' && project.triggerCardsIssue) {
		const secondSplit = firstSplit[1].split('(');
		const title = secondSplit[0];
		if (title) {
			await repo.createIssue(title, card.url);
		}
	}
});
export default TrelloCard;
