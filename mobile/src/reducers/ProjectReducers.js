/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 19:50:08
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 20:01:00
 */

//@flow

import { GET_PROJECTS, GET_PROJECTS_FAILURE, GET_PROJECTS_SUCCESS } from '@actions/types';

type State = {
    list: any[],
    isLoading: boolean,
    error: ?any
};

const initialState: State = {
    list: [],
    isLoading: false,
    error: null
};

export default (state: State = initialState, action: { type: string, payload: any, error: any }) => {
    switch (action.type) {
        case GET_PROJECTS:
            return { ...state, isLoading: true };
        case GET_PROJECTS_SUCCESS:
            return { ...state, isLoading: false, list: action.payload.data };
        case GET_PROJECTS_FAILURE:
            return { ...state, isLoading: false, error: action.error.data };
        default:
            return state;
    }
};
