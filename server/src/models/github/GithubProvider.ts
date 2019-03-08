import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import github from '../../api/github';
import projectType from 'projectType';
import User from '../User';

const GithubProvider: any = sequelize.define('GithubProvider', {
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

GithubProvider.prototype.createRepo = async function(project: projectType) {
	const { name, description } = project;

	try {
		const { data } = await github.post(
			'/user/repos',
			{
				name,
				description,
				private: true,
				auto_init: true
			},
			{
				headers: {
					Authorization: `Bearer ${this.accessToken}`
				}
			}
		);
		const githubRepo = await project.createGithubRepo({
			name,
			description,
			githubId: data.id,
			nodeId: data.node_id,
			private: data.private,
			htmlUrl: data.html_url,
			cloneUrl: data.ssh_url,
			subscribersCount: data.subscribers_count,
			accessToken: this.accessToken
		});
		return githubRepo;
	} catch (e) {
		return null;
	}
};

GithubProvider.prototype.healthCheck = async function() {
	let healthState: boolean = true;

	try {
		github.get('/user', {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
	} catch (e) {
		healthState = false;
		const user = await User.findByPk(this.userId);
		user.githubService = false;
		await user.save();
		await this.destroy();
	} finally {
		return healthState;
	}
};
export default GithubProvider;
