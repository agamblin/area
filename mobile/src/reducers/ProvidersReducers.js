/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 18:19:44
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:28:41
 */

//@flow

import {
    LINK_PROVIDERS,
    LINK_PROVIDERS_FINISHED,
    LINK_GOOGLE,
    LINK_TRELLO,
    LINK_GITHUB,
    LINK_GOOGLE_FAILURE,
    LINK_GITHUB_FAILURE,
    LINK_TRELLO_FAILURE,
    LINK_GOOGLE_SUCCESS,
    LINK_GITHUB_SUCCESS,
    LINK_TRELLO_SUCCESS
} from '@actions/types';
import { TribeProviders } from '@utils';

type State = {
    currentProviders: ?TribeProviders,
    isLoading: boolean,
    error: ?string
};

const initialState: State = {
    currentProviders: null,
    isLoading: false,
    error: ''
};

export default (state: State = initialState, action: { type: string, payload: any, error: any }) => {
    switch (action.type) {
        case LINK_GITHUB:
        case LINK_GOOGLE:
        case LINK_TRELLO:
        case LINK_PROVIDERS:
            return { ...state, isLoading: true };
        case LINK_PROVIDERS_FINISHED:
            return { ...state, isLoading: false };
        case LINK_GOOGLE_SUCCESS: {
            const currentProviders = Object.assign({}, state.currentProviders, { googleToken: action.payload.data });
            return { ...state, currentProviders };
        }
        case LINK_GITHUB_SUCCESS: {
            const currentProviders = Object.assign({}, state.currentProviders, { githubToken: action.payload.data });
            return { ...state, currentProviders };
        }
        case LINK_TRELLO_SUCCESS: {
            const currentProviders = Object.assign({}, state.currentProviders, { trelloToken: action.payload.data });
            return { ...state, currentProviders };
        }
        case LINK_GOOGLE_FAILURE: {
            const currentProviders = Object.assign({}, state.currentProviders, { googleToken: null });
            return { ...state, currentProviders, erro: action.error.message };
        }
        case LINK_GITHUB_FAILURE: {
            const currentProviders = Object.assign({}, state.currentProviders, { githubToken: null });
            return { ...state, currentProviders, error: action.error.message };
        }
        case LINK_TRELLO_FAILURE: {
            const currentProviders = Object.assign({}, state.currentProviders, { trelloToken: null });
            return { ...state, currentProviders, error: action.error.data };
        }
        default:
            return state;
    }
};
