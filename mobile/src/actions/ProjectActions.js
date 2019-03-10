/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 18:45:49
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 19:49:50
 */

//@flow

import axios from 'axios';

import { GET_PROJECTS, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE } from './types';
import { store } from '@store';

export const getProjects: Function = () => {
    return {
        types: [GET_PROJECTS, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE],
        payload: {
            request: {
                method: 'GET',
                url: '/projects'
            }
        }
    };
};
