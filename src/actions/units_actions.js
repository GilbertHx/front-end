import axios from 'axios';

import { 
    FETCH_UNITS, CREATE_UNIT, EDIT_UNIT, DELETE_UNIT, CREATE_COMPLETION_UNIT
} from './types';

import history from '../utils/history';
import { ROOT_URL } from '../config/api_settings';

export function fetchUnits() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/course/units`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      });
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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      });
    return {
        type: CREATE_UNIT,
        payload: request
    };
}

export function unitCompletion(callback) {

    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/course/complete/unit/create/`,
            headers :{
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        }).then(response => {
            dispatch({ 
                type: CREATE_COMPLETION_UNIT,
                payload: response });
        }).then(() => {
            callback()
        })
    }
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/course/complete/unit/create/`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      });
    return {
        type: CREATE_COMPLETION_UNIT,
        payload: request
    };
}

export function editUnit(values, id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/course/unit/${id}/edit/`,
        data: values,
        headers : {
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      }).then(() => {
        history.push('/admin/units');
      });
    return {
        type: EDIT_UNIT,
        payload: request
    };
}

export function deleteUnit(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/course/unit/${id}/delete`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_UNIT,
        payload: id
    }
}