/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 13:24:22
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-13 17:11:34
 */

//@flow

import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import NavigationService from '../navigation/NavigationService';

import { LOGOUT } from '@actions/types';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

const axiosMiddlewareOptions = {
    interceptors: {
        request: [
            async (state, config) => {
                console.log(config);
                const { currentUser } = await store.getState().user;
                if (currentUser) {
                    const jwtToken = currentUser.token;
                    config.headers['Authorization'] = `Bearer ${jwtToken}`;
                }
                return config;
            }
        ],
        response: [
            {
                success({ getState, dispatch, getSourceAction }, req) {
                    return Promise.resolve(req);
                },
                error({ getState, dispatch, getSourceAction }, error) {
                    return Promise.reject(error);
                }
            }
        ]
    }
};

export const changeBaseURL: Function = (ip: string) => {
    instance.defaults.baseURL = `http://${ip}:8081/api`;
    console.log(`change ip to ${ip}`);
};

const rootReducer = (state: any, action) => {
    if (action.type === LOGOUT) {
        Object.keys(state).forEach(key => {
            storage.removeItem(key);
        });
        state = undefined;
        NavigationService.navigate('Auth');
    }

    return reducers(state, action);
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
    pReducer,
    {},
    applyMiddleware(ReduxThunk, axiosMiddleware(instance, axiosMiddlewareOptions))
);
export const persistor = persistStore(store);
