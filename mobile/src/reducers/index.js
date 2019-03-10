/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:12:01
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 02:44:12
 */

//@flow

import { combineReducers } from 'redux';

import UserReducer from './UserReducers';

export default combineReducers({
    user: UserReducer
});
