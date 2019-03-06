import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { AUTH_LOGOUT } from '../actions/types';
import auth from './auth';
import user from './user';
import google from './google';
import github from './github';
import trello from './trello';
import projects from './projects';

const appReducer = combineReducers({
	auth,
	user,
	google,
	github,
	trello,
	projects,
	form: formReducer
});

const rootReducer = (state: any, action: any) => {
	if (action.type === AUTH_LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
