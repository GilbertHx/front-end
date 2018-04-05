import axios from 'axios';

import { 
    AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_CURRENT_USER,
} from './types';

import history from '../utils/history';
import { ROOT_URL, headers } from '../config/api_settings';

export function loginUser(values, callback) {
    const { username, password } = values;
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/auth/login/`, { username, password })
            .then(response => {
                localStorage.setItem('token', response.data.key);
                dispatch({ type: AUTH_USER });
            })
            .then(() => callback())
            .catch((err) => {
                dispatch(authError(err.response.data.non_field_errors));
            });
    }
}

export function getCurrentUser() {
    return function(dispatch) {
        axios({ 
            method: 'get',
            url: `${ROOT_URL}/api/current/user/`,
            headers
        })
        .then(response => {
            localStorage.setItem('is_staff', response.data.is_staff)
            dispatch({ type: GET_CURRENT_USER,
                        payload: response});
            if (response.data.is_staff === true){
                history.push('/admin/dashboard')
            }else {
                history.push('/units');
            }
        })
        .catch((err) => {
            dispatch(authError(err.response.data.detail));
        });
    }

    // const request = axios({
    //     method: 'get',
    //     url: `${ROOT_URL}/api/current/user/`,
    //     headers
    // }).then(response => {
    //     localStorage.setItem('is_staff', response.data.is_staff)
    // });
    // console.log(request)
    // return {
    //     type: GET_CURRENT_USER,
    //     payload: request
    // }
}

export function signupUser(values, callback){
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/registration/`, values)
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.key);
            })
            .then(() => callback())
            .catch((err) => {
                dispatch(authError('Bad Singup Info'));
                // dispatch(authError(err.response.data.detail));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }; 
}

export function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    return { type: UNAUTH_USER };
}