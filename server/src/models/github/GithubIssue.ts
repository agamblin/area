import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import github from '../../api/github';
import githubIssueType from 'github/githubIssueType';
import GithubRepo from './GithubRepo';
import Project from '../Project';

const GithubIssue: any = sequelize.define('GithubIssue', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	url: {
		type: Sequelize.STRING,
		allowNull: false
	},
	number: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	state: {
		type: Sequelize.STRING,
		allowNull: false
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

GithubIssue.createMultiple = async function(issues: Array<githubIssueType>) {
	await Promise.all(
		issues.map(async issue => {
			const existing = await this.findByPk(issue.id);
			if (!existing) {
				this.create(issue);
			} else {
				this.upsert(issue);
			}
		})
	);
};

GithubIssue.fetchIssues = async function(
	repoId: string,
	repoName: string,
	accessToken: string
) {
	try {
		const { data } = await github.get(`/repos/${repoName}/issues`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		const issues: Array<githubIssueType> = data.map((issue: any) => {
			return {
				id: issue.id,
				url: issue.html_url,
				state: issue.state,
				number: issue.number,
				title: issue.title,
				body: issue.body,
				GithubRepoId: repoId
			};
		});
		await this.createMultiple(issues);
	} catch (err) {
		console.log(err);
		return;
	}
};

GithubIssue.afterCreate(async (githubIssue: githubIssueType) => {
	const repo = await GithubRepo.findByPk(githubIssue.GithubRepoId);
	const project = await Project.findByPk(repo.ProjectId);
	const board = await project.getTrelloBoard();
	if (githubIssue.state === 'open') {
		await board.createNewCard(
			`ISSUE #${githubIssue.number}: ${githubIssue.title}`,
			`${githubIssue.body}`,
			githubIssue.url
		);
	}
});

export default GithubIssue;
