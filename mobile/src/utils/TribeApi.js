/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 15:33:53
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-02-20 17:13:08
 */

//@flow

import axios from 'axios';
import { storeItem } from './StorageUtils';

const instance = axios.create({
    baseURL: 'http://tribe.eu-west-3.elasticbeanstalk.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const signUp: Function = (email: string, username: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        instance
            .post(
                '/signup',
                JSON.stringify({
                    email,
                    username,
                    password
                })
            )
            .then(res => {
                storeItem('USER_TOKEN', res.data);
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
};

export const signIn: Function = (email: string, password: string) => {
    return new Promise(async (resolve, reject) => {
        instance
            .post(
                '/signin',
                JSON.stringify({
                    email,
                    password
                })
            )
            .then(res => {
                storeItem('USER_TOKEN', res.data);
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
};
