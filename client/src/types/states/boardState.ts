import cardState from './cardState';
import trelloActivityState from './trelloActivityState';
import trelloMemberState from './trelloMemberState';

export default interface boardState {
	id: string;
	url: string;
	cards: Array<cardState>;
	activity: Array<trelloActivityState>;
	members: Array<trelloMemberState>;
}
