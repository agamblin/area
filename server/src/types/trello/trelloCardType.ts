import trelloMemberType from './trelloMemberType';

export default interface trelloCardType {
	id: string;
	name: string;
	description?: string;
	accessToken: string;
	url: string;
	members?: Array<trelloMemberType>;
}
