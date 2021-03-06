import trelloMemberType from './trelloMemberType';

export default interface trelloCardType {
	id: string;
	name: string;
	description?: string;
	accessToken: string;
	url: string;
	listId: string;
	fetchInfo?: () => any;
	TrelloBoardId?: string;
	members?: Array<trelloMemberType>;
}
