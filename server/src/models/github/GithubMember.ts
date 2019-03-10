import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import githubMemberType from 'github/githubMemberType';

const GithubMember: any = sequelize.define('GithubMember', {
	githubId: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	avatarUrl: {
		type: Sequelize.STRING,
		allowNull: true
	},
	admin: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});

GithubMember.createMultiple = async function(
	source: Array<githubMemberType>,
	repoId: string
) {
	await Promise.all(
		source.map(async member => {
			const exist = await this.findOne({
				where: { GithubRepoId: repoId, githubId: member.githubId }
			});
			if (!exist) {
				return await this.create(member);
			}
			return {};
		})
	);
	return true;
};
export default GithubMember;
