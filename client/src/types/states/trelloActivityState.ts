import trelloMemberState from './trelloMemberState';
import cardState from './cardState';

export default interface trelloActivityState {
	id: string;
	type: string;
	date: string;
	member: trelloMemberState;
	targetMember?: trelloMemberState;
	targetCard?: cardState;
}
