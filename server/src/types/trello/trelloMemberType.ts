import trelloActionType from './trelloActionType';

export default interface trelloMemberType {
	id: number;
	trelloId: string;
	fullName?: string;
	username?: string;
	avatarUrl?: string;
	accessToken: string;
	getActions: () => any;
	getTrelloActions: () => Array<trelloActionType>;
}
