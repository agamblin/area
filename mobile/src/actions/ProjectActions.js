/*
 * @Author: Karim DALAIZE
 * @Date: 2019-03-10 18:45:49
 * @Last Modified by: Karim DALAIZE
 * @Last Modified time: 2019-03-10 22:16:50
 */

//@flow

import axios from 'axios';

import {
    GET_PROJECTS,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE,
    CREATE_PROJECT,
    CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_FAILURE
} from './types';
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

export const createProject: Function = (name: string, description: string) => {
    return {
        types: [CREATE_PROJECT, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE],
        payload: {
            request: {
                method: 'POST',
                url: 'projects',
                data: {
                    name,
                    description
                }
            }
        }
    };
};
