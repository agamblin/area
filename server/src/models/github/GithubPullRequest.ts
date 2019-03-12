import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import githubPullRequestType from 'github/githubPullRequestType';
import GithubMember from './GithubMember';
import github from '../../api/github';
import GithubRepo from './GithubRepo';
import Project from '../Project';

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
	triggered: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
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
		await github.put(
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

GithubPullRequest.fetchPullRequests = async function(
	repoId: string,
	repoName: string,
	accessToken: string,
	triggered: boolean
) {
	const { data } = await github.get(`/repos/${repoName}/pulls`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	const rawRequests = await Promise.all(
		data.map(async (pullRequest: any) => {
			const opener = await GithubMember.findOne({
				where: { githubId: pullRequest.user.id, GithubRepoId: repoId }
			});
			return {
				id: pullRequest.id,
				title: pullRequest.title,
				body: pullRequest.body,
				url: pullRequest.url,
				sha: pullRequest.merge_commit_sha,
				number: pullRequest.number,
				state: pullRequest.state,
				triggered,
				userId: opener.id,
				origin: pullRequest.head.ref,
				target: pullRequest.base.ref,
				createdDate: pullRequest.created_at.split('T')[0],
				updatedDate: pullRequest.updated_at.split('T')[0],
				GithubRepoId: repoId
			};
		})
	);
	await this.bulkCreate(rawRequests, {
		individualHooks: true,
		ignoreDuplicates: false,
		updateOnDuplicate: ['title', 'body', 'url', 'state', 'updatedDate']
	});
};

GithubPullRequest.afterCreate(async (pullRequest: githubPullRequestType) => {
	const repo = await GithubRepo.findByPk(pullRequest.GithubRepoId);
	const project = await Project.findByPk(repo.ProjectId);
	const board = await project.getTrelloBoard();
	await board.createNewCard(
		`PR #${pullRequest.number}: ${pullRequest.title}`,
		`${pullRequest.body} (${pullRequest.origin} => ${pullRequest.target})`,
		pullRequest.url
	);
});

export default GithubPullRequest;
