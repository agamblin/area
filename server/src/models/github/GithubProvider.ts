import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import github from '../../api/github';

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

GithubProvider.prototype.createRepo = async function(project: any) {
	const { name, description } = project;

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
	const repo = await project.createGithubRepo({
		name,
		description,
		githubId: data.id,
		nodeId: data.node_id,
		private: data.private,
		htmlUrl: data.html_url,
		cloneUrl: data.ssh_url,
		suscribersCount: data.suscribers_count
	});
	console.log(repo);
};

export default GithubProvider;
