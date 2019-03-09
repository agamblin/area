import trelloMemberState from './trelloMemberState';
import trelloActivityState from './trelloActivityState';

export default interface selectedMemberState extends trelloMemberState {
	activity: Array<trelloActivityState>;
}
