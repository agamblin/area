import cardState from './cardState';
import trelloActivityState from './trelloActivityState';
import trelloMemberState from './trelloMemberState';
import trelloListState from './trelloListState';

export default interface boardState {
	id: string;
	url: string;
	cards: Array<cardState>;
	activity: Array<trelloActivityState>;
	members: Array<trelloMemberState>;
	lists: Array<trelloListState>;
}
