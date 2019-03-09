import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import TrelloCard from './TrelloCard';

const TrelloMember: any = sequelize.define('TrelloMember', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
		primaryKey: true
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
				member = await TrelloMember.findByPk(action.idTargetMember);
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

export default TrelloMember;
