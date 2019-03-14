/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 18:16:31
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-13 17:30:59
 */

//@flow

import axios from 'axios';

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
} from './types';
import { storeItem, remove } from '@utils';
import { store } from '@store';

const linkGoogle: Function = () => {
    return {
        types: [LINK_GOOGLE, LINK_GOOGLE_SUCCESS, LINK_GOOGLE_FAILURE],
        payload: {
            request: {
                method: 'GET',
                url: '/google'
            }
        }
    };
};

const linkGithub: Function = () => {
    return {
        types: [LINK_GITHUB, LINK_GITHUB_SUCCESS, LINK_GITHUB_FAILURE],
        payload: {
            request: {
                method: 'GET',
                url: '/github'
            }
        }
    };
};

const linkTrello: Function = () => {
    return {
        types: [LINK_TRELLO, LINK_TRELLO_SUCCESS, LINK_TRELLO_FAILURE],
        payload: {
            request: {
                method: 'GET',
                url: '/trello'
            }
        }
    };
};

export const linkProviders: Function = () => {
    return (dispatch: Function) => {
        dispatch({ type: LINK_PROVIDERS });
        Promise.all([dispatch(linkGoogle()), dispatch(linkGithub()), dispatch(linkTrello())]).then(() =>
            dispatch({ type: LINK_PROVIDERS_FINISHED })
        );
    };
};
