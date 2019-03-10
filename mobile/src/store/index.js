/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-20 13:24:22
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 04:16:43
 */

//@flow

import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createStore, applyMiddleware } from 'redux';

import { LOGOUT } from '@actions/types';
import reducers from '../reducers';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = (state: any, action) => {
    if (action.type === LOGOUT) {
        Object.keys(state).forEach(key => {
            storage.removeItem(key);
        });
        state = undefined;
    }

    return reducers(state, action);
};

const pReducer = persistReducer(persistConfig, reducers);
export const store = createStore(pReducer, {}, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);
