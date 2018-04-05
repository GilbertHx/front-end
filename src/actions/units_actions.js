import axios from 'axios';

import { 
    FETCH_UNITS, CREATE_UNIT, DELETE_UNIT
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';

export function fetchUnits() {
    const request = axios.get(`${ROOT_URL}/api/course/units`);
    return {
        type: FETCH_UNITS,
        payload: request
    };
}

export function createUnit(values) {

    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/course/unit/create/`,
        data: values,
        headers
      });
    return {
        type: CREATE_UNIT,
        payload: request
    };
}

export function deleteUnit(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/course/unit/${id}/delete`,
        headers
    });
    return {
        type: DELETE_UNIT,
        payload: id
    }
}