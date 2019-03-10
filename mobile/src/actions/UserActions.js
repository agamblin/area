/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:41:37
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 04:12:15
 */

//@flow

import axios from 'axios';

import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LINK_PROVIDERS,
    LOGOUT
} from './types';
import { storeItem, getProviderToken, remove } from '@utils';

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signUp: Function = (email: string, username: string, password: string) => {
    return (dispatch: Function) => {
        instance
            .post(
                '/auth/signup',
                JSON.stringify({
                    email,
                    username,
                    password
                })
            )
            .then(res => {
                storeItem('USER_TOKEN', res.data);
                dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: {
                        data: res.data
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: SIGN_UP_FAILURE,
                    payload: {
                        error: error.data
                    }
                });
            });
    };
};

export const signIn: Function = (email: string, password: string) => {
    return (dispatch: Function) => {
        instance
            .post(
                '/auth/signin',
                JSON.stringify({
                    email,
                    password
                })
            )
            .then(res => {
                storeItem('USER_TOKEN', res.data);
                console.log(res.data);
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: {
                        data: res.data
                    }
                });
            })
            .catch(error => {
                dispatch({
                    type: SIGN_IN_FAILURE,
                    payload: {
                        error: error.data
                    }
                });
            });
    };
};

export const linkProviders: Function = () => {
    return (dispatch: Function) => {
        const googleToken = getProviderToken('google');
        const githubToken = getProviderToken('github');
        const trelloToken = getProviderToken('trello');
        console.log(googleToken);
        console.log(githubToken);
        console.log(trelloToken);

        dispatch({
            type: LINK_PROVIDERS,
            payload: {
                data: {
                    googleToken,
                    githubToken,
                    trelloToken
                }
            }
        });
    };
};

export const logout: Function = () => {
    return (dispatch: Function) => {
        remove();
        dispatch({
            type: LOGOUT
        });
    };
};
