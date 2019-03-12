import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import trelloListType from 'trello/trelloListType';

const TrelloList: any = sequelize.define('TrelloList', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

TrelloList.getFormattedLists = async function(boardId: string) {
	const lists: Array<trelloListType> = await this.findAll({
		where: { TrelloBoardId: boardId }
	});
	return lists.map(list => {
		return {
			id: list.id,
			name: list.name
		};
	});
};

export default TrelloList;
