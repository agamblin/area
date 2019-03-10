import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import githubCommitType from 'github/githubCommitType';
import GithubMember from './GithubMember';
import * as _ from 'lodash';

const GithubCommit: any = sequelize.define('GithubCommit', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	message: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

GithubCommit.getFormattedCommits = async function(repoId: string) {
	const rawCommits: Array<githubCommitType> = await this.findAll({
		where: { GithubRepoId: repoId }
	});
	const commits = await Promise.all(
		rawCommits.map(async commit => {
			const author = await GithubMember.findByPk(commit.GithubMemberId);
			return {
				..._.pick(commit, 'id', 'message'),
				author: _.pick(author, 'name', 'avatarUrl')
			};
		})
	);
	return commits;
};

export default GithubCommit;
