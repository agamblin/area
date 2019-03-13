import trelloCardType from './trelloCardType';
import trelloMemberType from './trelloMemberType';
import projectType from 'projectType';

export default interface trelloBoardType {
	id: string;
	name: string;
	description: string;
	url: string;
	accessToken: string;
	destroy?: () => any;
	getProject?: () => projectType;
	createTrelloCard?: (source: trelloCardType) => trelloCardType;
	getTrelloCards?: () => Array<trelloCardType>;
	createTrelloMember?: (source: trelloMemberType) => trelloMemberType;
	getTrelloMembers?: () => Array<trelloMemberType>;
	fetchCards?: () => any;
	fetchBoard?: () => Array<any>;
}
