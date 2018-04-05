import axios from 'axios';

import { 
    FETCH_USERS, FETCH_SINGLE_USER, ACTIVATE_USER, DEACTIVATE_USER, MAKE_USER_STAFF, MAKE_USER_STUDENT
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';

export function fetchUsers() {
    const request = axios.get(`${ROOT_URL}/api/users/`);
    return {
        type: FETCH_USERS,
        payload: request
    };
}

export function fetchSingleUser(id) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/user/detail/${id}/`,
        headers
    });
    return {
        type: FETCH_SINGLE_USER,
        payload: request
    };
}

export function activateUser(id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/user/${id}/update/`,
        data: {
            is_active: true
        },
        headers
    });

    return {
        type: ACTIVATE_USER,
        payload: request
    }
}

export function deactivateUser(id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/user/${id}/update/`,
        data: {
            is_active: false
        },
        headers
    });

    return {
        type: DEACTIVATE_USER,
        payload: request
    }
}

export function makeUserStaff(id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/user/${id}/update/`,
        data: {
            is_staff: true
        },
        headers
    });

    return {
        type: MAKE_USER_STAFF,
        payload: request
    }
}

export function makeUserStudent(id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/user/${id}/update/`,
        data: {
            is_staff: false
        },
        headers
    });

    return {
        type: MAKE_USER_STUDENT,
        payload: request
    }
}