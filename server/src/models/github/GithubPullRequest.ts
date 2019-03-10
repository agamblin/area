import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import githubPullRequestType from 'github/githubPullRequestType';
import GithubMember from './GithubMember';
import github from '../../api/github';

const GithubPullRequest: any = sequelize.define('GithubPullRequest', {
	id: {
		type: Sequelize.STRING,
		unique: true,
		primaryKey: true,
		allowNull: false
	},
	origin: {
		type: Sequelize.STRING,
		allowNull: false
	},
	target: {
		type: Sequelize.STRING,
		allowNull: false
	},
	number: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	sha: {
		type: Sequelize.STRING,
		allowNull: false
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.STRING,
		allowNull: false
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	createdDate: {
		type: Sequelize.STRING,
		allowNull: false
	},
	updatedDate: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

GithubPullRequest.getFormattedInfo = async function(repoId: string) {
	try {
		const rawRequests: Array<githubPullRequestType> = await this.findAll({
			where: { GithubRepoId: repoId }
		});

		const requests = await Promise.all(
			rawRequests.map(async request => {
				const creator = await GithubMember.findByPk(request.userId);
				return {
					..._.pick(
						request,
						'id',
						'title',
						'body',
						'origin',
						'target',
						'url',
						'state',
						'createdDate',
						'updatedDate'
					),
					creator: _.pick(creator, 'name', 'avatarUrl')
				};
			})
		);
		return requests;
	} catch (err) {
		console.log(err);
		return null;
	}
};

GithubPullRequest.prototype.merge = async function() {
	try {
		const repo = await this.getGithubRepo();
		const { data } = await github.put(
			`/repos/${repo.name}/pulls/${this.number}/merge`,
			{
				commit_title: this.title,
				commit_message: this.body,
				sha: this.sha,
				merge_method: 'merge'
			},
			{
				headers: {
					Authorization: `Bearer ${repo.accessToken}`
				}
			}
		);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
export default GithubPullRequest;
