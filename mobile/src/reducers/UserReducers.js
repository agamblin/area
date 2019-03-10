/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:32:58
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 15:07:04
 */

//@flow

import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LINK_PROVIDERS,
    LINK_PROVIDERS_FINISHED,
    LINK_GOOGLE,
    LINK_TRELLO,
    LINK_GITHUB,
    LINK_GOOGLE_FAILURE,
    LINK_GITHUB_FAILURE,
    LINK_TRELLO_FAILURE
} from '@actions/types';
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

        case LINK_PROVIDERS:
            return { ...state, isLoading: true };
        case LINK_PROVIDERS_FINISHED:
            return { ...state, isLoading: false };
        case LINK_GOOGLE: {
            const currentUser = Object.assign({}, state.currentUser, { googleToken: action.payload.data });
            return { ...state, currentUser };
        }
        case LINK_GITHUB: {
            const currentUser = Object.assign({}, state.currentUser, { githubToken: action.payload.data });
            return { ...state, currentUser };
        }
        case LINK_TRELLO: {
            const currentUser = Object.assign({}, state.currentUser, { trelloToken: action.payload.data });
            return { ...state, currentUser };
        }
        case LINK_GOOGLE_FAILURE: {
            const currentUser = state.currentUser;
            if (currentUser) {
                currentUser.googleToken = '';
            }
            return { ...state, currentUser };
        }
        case LINK_GITHUB_FAILURE: {
            const currentUser = state.currentUser;
            if (currentUser) {
                currentUser.githubToken = '';
            }
            return { ...state, currentUser };
        }
        case LINK_TRELLO_FAILURE: {
            const currentUser = state.currentUser;
            if (currentUser) {
                currentUser.trelloToken = '';
            }
            return { ...state, currentUser };
        }
        default:
            return state;
    }
};
