import projectType from '../projectType';
import trelloBoardType from './trelloBoardType';

export default interface trelloProviderType {
	id?: number;
	name: string;
	accessToken: string;
	userId?: number;
	destroy?: () => any;
	createBoard?: (source: projectType) => trelloBoardType;
	healthCheck?: () => boolean;
}
