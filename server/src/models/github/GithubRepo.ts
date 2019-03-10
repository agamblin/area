import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import github from '../../api/github';
import GithubMember from './GithubMember';

const GithubRepo: any = sequelize.define('GithubRepo', {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	nodeId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	private: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	},
	htmlUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	cloneUrl: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subscribersCount: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	accessToken: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

GithubRepo.prototype.fetchCollaborators = async function() {
	try {
		const { data } = await github.get(`/repos/${this.name}/collaborators`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
		const members = data.map((member: any) => {
			return {
				githubId: member.id,
				name: member.login,
				avatarUrl: member.avatar_url,
				admin: member.permissions.admin
			};
		});
	} catch (err) {
		console.log(err);
	}
};

GithubRepo.prototype.fetchInfo = async function() {
	await this.fetchCollaborators();
	console.log('ENTERING GITHUB FETCH REPO API');
	// try {
	// 	const { data } = await github.get(`/repos/${this.name}`, {
	// 		headers: {
	// 			Authorization: `Bearer ${this.accessToken}`
	// 		}
	// 	});
	// 	console.log(data);
	// } catch (err) {
	// 	console.log(err);
	// }
};

export default GithubRepo;
