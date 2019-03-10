import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import TrelloCard from './TrelloCard';
import trelloMemberType from 'trello/trelloMemberType';

const TrelloMember: any = sequelize.define('TrelloMember', {
	trelloId: {
		type: Sequelize.STRING,
		allowNull: false
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

TrelloMember.prototype.getActions = async function() {
	const rawActions = await this.getTrelloActions();

	const actions = await Promise.all(
		rawActions.map(async (action: any) => {
			let member = null;
			let card = null;

			if (action.idTargetMember) {
				member = await TrelloMember.findOne({
					where: { trelloId: action.idTargetMember }
				});
			}

			if (action.idTargetCard) {
				card = await TrelloCard.findByPk(action.idTargetCard);
			}
			return {
				id: action.id,
				type: action.type,
				date: action.date,
				member: _.pick(this, 'fullName', 'avatarUrl'),
				targetMember: _.pick(member, 'fullName', 'avatarUrl'),
				targetCard: _.pick(card, 'name')
			};
		})
	);
	return actions;
};

TrelloMember.createMultiple = async function(
	trelloBoardId: string,
	source: Array<trelloMemberType>
) {
	await Promise.all(
		source.map(async member => {
			const exist = await this.findOne({
				where: { TrelloBoardId: trelloBoardId, trelloId: member.trelloId }
			});
			if (!exist) {
				return await this.create(member);
			}
			return {};
		})
	);
	return {};
};
TrelloMember.beforeCreate(member => {
	console.log(member);
});

export default TrelloMember;
