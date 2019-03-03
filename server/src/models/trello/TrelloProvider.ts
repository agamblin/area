import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as keys from '../../keys';
import trello from '../../api/trello';
import * as qs from 'query-string';

const TrelloProvider: any = sequelize.define('TrelloProvider', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

TrelloProvider.prototype.createNewBoard = async function(project: any) {
	const querystring = qs.stringify({
		name: project.name,
		desc: project.description,
		key: keys.trelloKey,
		defaultLabels: true,
		defaultLists: true,
		prefs_cardCovers: true,
		prefs_background: 'grey',
		token: this.accessToken
	});
	const { data } = await trello.post(`/boards/?${querystring}`);
	await project.createTrelloBoard({
		trelloId: data.id,
		name: data.name,
		description: data.desc,
		url: data.shortUrl
	});
};

export default TrelloProvider;
