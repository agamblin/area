import trelloCardType from './trelloCardType';
import trelloMemberType from './trelloMemberType';

export default interface trelloBoardType {
	id: string;
	name: string;
	description: string;
	url: string;
	accessToken: string;
	destroy?: () => any;
	createTrelloCard?: (source: trelloCardType) => trelloCardType;
	getTrelloCards?: () => Array<trelloCardType>;
	createTrelloMember?: (source: trelloMemberType) => trelloMemberType;
	getTrelloMembers?: () => Array<trelloMemberType>;
	fetchBoard?: () => Array<any>;
}
