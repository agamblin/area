import trelloLabelState from './trelloLabelState';
import trelloMemberState from './trelloMemberState';

export default interface selectedCardState {
	id: string;
	name: string;
	url: string;
	description: string;
	due: string;
	dateLastActivity: string;
	labels: Array<trelloLabelState>;
	members: Array<trelloMemberState>;
}
