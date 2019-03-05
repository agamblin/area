import projectType from '../projectType';
import githubRepoType from './githubRepoType';

export default interface githubProviderType {
	id?: number;
	name: string;
	accessToken: string | string[];
	createRepo?: (source: projectType) => githubRepoType;
	destroy?: () => any;
}
