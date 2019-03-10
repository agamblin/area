/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 01:41:37
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:43:38
 */

//@flow

import axios from 'axios';

import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, LOGOUT } from './types';
import { storeItem, remove } from '@utils';
import { store } from '@store';
import { linkProviders } from './ProvidersActions';

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signUp: Function = (email: string, username: string, password: string) => {
    return {
        types: [SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE],
        payload: {
            request: {
                method: 'POST',
                url: '/auth/signup',
                data: {
                    email,
                    username,
                    password
                }
            }
        }
    };
};

export const signIn: Function = (email: string, password: string) => {
    return {
        types: [SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE],
        payload: {
            request: {
                method: 'POST',
                url: '/auth/signin',
                data: {
                    email,
                    password
                }
            }
        }
    };
};

export const logout: Function = () => (dispatch: Function) => {
    dispatch({
        type: LOGOUT
    });
};
