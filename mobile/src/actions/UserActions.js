/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:41:37
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 15:07:18
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
    LINK_PROVIDERS_FINISHED,
    LINK_GOOGLE,
    LINK_TRELLO,
    LINK_GITHUB,
    LINK_GOOGLE_FAILURE,
    LINK_GITHUB_FAILURE,
    LINK_TRELLO_FAILURE,
    LOGOUT
} from './types';
import { storeItem, getProviderToken, remove } from '@utils';
import { store } from '@store';

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
                dispatch(linkProviders());
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

const linkGoogle: Function = () => {
    return (dispatch: Function) => {
        const { currentUser } = store.getState().user;

        if (currentUser.token) {
            const token = currentUser.token;
            instance.defaults.headers['Authorization'] = `Bearer ${token}`;
            instance
                .get(`/google`)
                .then(res => {
                    dispatch({
                        type: LINK_GOOGLE,
                        payload: {
                            data: res.data.accessToken
                        }
                    });
                })
                .catch(error =>
                    dispatch({
                        type: LINK_GOOGLE_FAILURE,
                        payload: {
                            error: error.data
                        }
                    })
                );
        }
    };
};

const linkGithub: Function = () => {
    return (dispatch: Function) => {
        const { currentUser } = store.getState().user;

        if (currentUser.token) {
            const token = currentUser.token;
            instance.defaults.headers['Authorization'] = `Bearer ${token}`;
            instance
                .get('/github')
                .then(res => {
                    dispatch({
                        type: LINK_GITHUB,
                        payload: {
                            data: res.data.accessToken
                        }
                    });
                })
                .catch(error => {
                    dispatch({
                        type: LINK_GITHUB_FAILURE,
                        payload: {
                            error: error.data
                        }
                    });
                });
        }
    };
};

const linkTrello: Function = () => {
    return (dispatch: Function) => {
        const { currentUser } = store.getState().user;

        if (currentUser.token) {
            const token = currentUser.token;
            instance.defaults.headers['Authorization'] = `Bearer ${token}`;
            instance
                .get('/trello')
                .then(res => {
                    dispatch({
                        type: LINK_TRELLO,
                        payload: {
                            data: res.data.accessToken
                        }
                    });
                })
                .catch(error =>
                    dispatch({
                        type: LINK_TRELLO_FAILURE,
                        payload: {
                            error: error.data
                        }
                    })
                );
        }
    };
};

export const linkProviders: Function = () => {
    return (dispatch: Function) => {
        console.log('linking providers');

        dispatch({ type: LINK_PROVIDERS });
        dispatch(linkGoogle());
        dispatch(linkGithub());
        dispatch(linkTrello());
        dispatch({ type: LINK_PROVIDERS_FINISHED });
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
