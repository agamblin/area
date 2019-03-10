import sequelize from '../../utils/database';
import * as Sequelize from 'sequelize';
import * as _ from 'lodash';
import githubBranchType from 'github/githubBranchType';

const GithubBranch: any = sequelize.define('GithubBranch', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

GithubBranch.createMultiple = async function(source: Array<githubBranchType>) {
	await Promise.all(
		source.map(async branch => {
			const exist = await this.findOne({
				where: { name: branch.name, GithubRepoId: branch.GithubRepoId }
			});
			if (!exist) {
				await this.create(branch);
			}
			return {};
		})
	);
};

export default GithubBranch;
