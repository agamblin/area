import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import github from '../../api/github';
import GithubMember from './GithubMember';
import GithubCommit from './GithubCommit';
import * as _ from 'lodash';
import githubMemberType from 'github/githubMemberType';
import GithubBranch from './GithubBranch';
import githubBranchType from 'github/githubBranchType';
import GithubPullRequest from './GithubPullRequest';

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
				admin: member.permissions.admin,
				GithubRepoId: this.id
			};
		});
		await GithubMember.createMultiple(members, this.id);
		const rawGithubMembers: Array<
			githubMemberType
		> = await GithubMember.findAll({ where: { GithubRepoId: this.id } });
		const githubMembers = rawGithubMembers.map(githubMember => {
			return _.pick(githubMember, 'id', 'name', 'avatarUrl', 'admin');
		});
		return githubMembers;
	} catch (err) {
		return null;
	}
};

GithubRepo.prototype.fetchPullRequests = async function() {
	try {
		const { data } = await github.get(`/repos/${this.name}/pulls`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
		const rawRequests = await Promise.all(
			data.map(async (pullRequest: any) => {
				const opener = await GithubMember.findOne({
					where: { githubId: pullRequest.user.id, GithubRepoId: this.id }
				});
				return {
					id: pullRequest.id,
					title: pullRequest.title,
					body: pullRequest.body,
					url: pullRequest.url,
					sha: pullRequest.merge_commit_sha,
					number: pullRequest.number,
					state: pullRequest.state,
					userId: opener.id,
					origin: pullRequest.head.ref,
					target: pullRequest.base.ref,
					createdDate: pullRequest.created_at.split('T')[0],
					updatedDate: pullRequest.updated_at.split('T')[0],
					GithubRepoId: this.id
				};
			})
		);
		await GithubPullRequest.bulkCreate(rawRequests, {
			updateOnDuplicate: ['title', 'body', 'url', 'state', 'updatedDate']
		});
		const pullRequests = await GithubPullRequest.getFormattedInfo(this.id);
		return pullRequests;
	} catch (err) {
		console.log(err);
		return null;
	}
};

GithubRepo.prototype.fetchBranches = async function() {
	try {
		const { data } = await github.get(`/repos/${this.name}/branches`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
		const rawBranch = await data.map((branch: any) => {
			return {
				name: branch.name,
				GithubRepoId: this.id
			};
		});
		await GithubBranch.createMultiple(rawBranch);
		const rawBranches: Array<githubBranchType> = await GithubBranch.findAll({
			where: { GithubRepoId: this.id }
		});
		const branches = rawBranches.map(branch => {
			return _.pick(branch, 'name');
		});
		return branches;
	} catch (err) {
		console.log(err);
		return null;
	}
};

GithubRepo.prototype.fetchCommits = async function() {
	try {
		const { data } = await github.get(`/repos/${this.name}/commits`, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`
			}
		});
		const rawCommits = await Promise.all(
			data.map(async (commit: any) => {
				const author = await GithubMember.findOne({
					where: { githubId: commit.author.id, GithubRepoId: this.id }
				});
				return {
					id: commit.node_id,
					message: commit.commit.message,
					GithubMemberId: author.id,
					GithubRepoId: this.id
				};
			})
		);
		await GithubCommit.bulkCreate(rawCommits, {
			updateOnDuplicate: ['message']
		});

		const commits = await GithubCommit.getFormattedCommits(this.id);
		return commits;
	} catch (err) {
		console.log(err);
		return null;
	}
};

GithubRepo.prototype.fetchInfo = async function() {
	const members = await this.fetchCollaborators();
	const commits = await this.fetchCommits();
	const branches = await this.fetchBranches();
	const pullRequests = await this.fetchPullRequests();
	return {
		members,
		commits,
		branches,
		pullRequests
	};
};

export default GithubRepo;
