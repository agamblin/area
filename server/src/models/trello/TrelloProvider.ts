import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as keys from '../../keys';
import trello from '../../api/trello';
import * as qs from 'query-string';
import projectType from 'projectType';
import User from '../User';

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

TrelloProvider.prototype.createBoard = async function(project: projectType) {
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
	try {
		const { data } = await trello.post(`/boards/?${querystring}`);
		const trelloBoard = await project.createTrelloBoard({
			trelloId: data.id,
			name: data.name,
			description: data.desc,
			url: data.shortUrl
		});
		return trelloBoard;
	} catch (e) {
		return null;
	}
};

TrelloProvider.prototype.healthCheck = async function() {
	let healthState: boolean = true;
	const querystring = qs.stringify({
		key: keys.trelloKey,
		token: this.accessToken
	});
	try {
		await trello.get(`/members/me?${querystring}`);
	} catch (e) {
		healthState = false;
		const user = await User.findByPk(this.userId);
		user.trelloService = false;
		await user.save();
		await this.destroy();
	} finally {
		return healthState;
	}
};

export default TrelloProvider;
