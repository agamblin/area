import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import TrelloMember from './TrelloMember';
import TrelloCard from './TrelloCard';

const TrelloAction: any = sequelize.define('TrelloAction', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
		allowNull: false
	},
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	date: {
		type: Sequelize.STRING,
		allowNull: false
	},
	idTargetMember: {
		type: Sequelize.STRING,
		allowNull: true
	},
	idTargetCard: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

TrelloAction.fetchFeed = async function() {
	const rawActions = await this.findAll({ include: TrelloMember });
	const actions = await Promise.all(
		rawActions.map(async (action: any) => {
			let member = null;
			let card = null;

			if (action.idTargetCard) {
				card = await TrelloCard.findByPk(action.idTargetCard);
			}

			if (action.idTargetMember) {
				member = await TrelloMember.findByPk(action.idTargetMember);
			}

			return {
				id: action.id,
				type: action.type,
				date: action.date,
				member: _.pick(action.TrelloMember, 'fullName', 'avatarUrl'),
				targetMember: _.pick(member, 'fullName', 'avatarUrl'),
				targetCard: _.pick(card, 'name')
			};
		})
	);
	return actions;
};

export default TrelloAction;
