/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:32:58
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 18:19:41
 */

//@flow

import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '@actions/types';
import { TribeUser } from '@utils';

type State = {
    currentUser: ?TribeUser,
    isLoading: boolean,
    error: ?string
};

const initialState: State = {
    currentUser: null,
    isLoading: false,
    error: ''
};

export default (state: State = initialState, action: { type: string, payload: any, error: any }) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isLoading: true };
        case SIGN_UP:
            return { ...state, isLoading: true };
        case SIGN_IN_SUCCESS:
            return { ...state, isLoading: false, currentUser: action.payload.data };
        case SIGN_UP_SUCCESS:
            return { ...state, isLoading: false, currentUser: action.payload.data };
        case SIGN_IN_FAILURE:
            return { ...state, isLoading: false, error: action.error.data };
        case SIGN_UP_FAILURE:
            return { ...state, isLoading: false, error: action.error.data };

        default:
            return state;
    }
};
