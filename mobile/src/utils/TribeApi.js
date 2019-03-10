/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 15:33:53
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 04:03:03
 */

//@flow

import axios from 'axios';

import { storeItem, retrieveItem } from './StorageUtils';
import { store } from '@store';

const instance = axios.create({
    baseURL: 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getProviderToken: Function = (provider: string) => {
    const { currentUser } = store.getState().user;

    if (currentUser.token) {
        const token = currentUser.token;
        instance.defaults.headers['Authorization'] = `Bearer ${token}`;
        instance
            .get(`/${provider}`)
            .then(res => {
                console.log(res.data.accessToken);
                return res.data.accessToken;
            })
            .catch(error => console.warn(error));
    }
};
