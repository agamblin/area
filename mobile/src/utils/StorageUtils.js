/*
 * @Author: Karim DALAIZE
 * @Date: 2019-02-19 10:59:14
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 04:12:45
 */

//@flow

import { AsyncStorage } from 'react-native';

export const retrieveItem: Function = async (key: string) => {
    try {
        const retrieveItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrieveItem);
        return item;
    } catch (error) {
        console.warn(error);
    }
};

export const storeItem: Function = async (key: string, item: any) => {
    try {
        let jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.warn(error);
    }
};

export const remove: Function = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.warn(error);
    }
};
