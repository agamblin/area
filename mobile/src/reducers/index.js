/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:12:01
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:55:04
 */

//@flow

import { combineReducers } from 'redux';

import UserReducer from './UserReducers';
import ProvidersReducer from './ProvidersReducers';
import ProjectsReducer from './ProjectReducers';

export default combineReducers({
    user: UserReducer,
    providers: ProvidersReducer,
    projects: ProjectsReducer
});
