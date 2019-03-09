import { MEMBER_FETCH, MEMBER_EMPTY } from '../actions/types';
import selectedMemberState from '../types/states/selectedMemberState';

export default (state = {} as selectedMemberState, action: any) => {
	switch (action.type) {
		case MEMBER_FETCH:
			return {
				...state,
				...action.payload,
				activity: action.payload.activity.reverse()
			};
		case MEMBER_EMPTY:
			return {};
		default:
			return state;
	}
};
