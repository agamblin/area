import trelloMemberType from './trelloMemberType';

export default interface trelloCardType {
	id: string;
	name: string;
	description?: string;
	accessToken: string;
	url: string;
	fetchInfo?: () => any;
	members?: Array<trelloMemberType>;
}
