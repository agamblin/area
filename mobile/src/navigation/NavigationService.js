/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 23:52:14
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 23:53:49
 */

//@flow

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params: any) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    setTopLevelNavigator
};
