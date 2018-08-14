import axios from 'axios';

import { 
    AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_CURRENT_USER, AUTH_SUCCESS
} from './types';

import history from '../utils/history';
import { ROOT_URL } from '../config/api_settings';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function loginUser(values, callback) {
    const { username, password } = values;
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/auth/login/`, { username, password })
            .then(response => {
                localStorage.setItem('token', response.data.key);
                dispatch({ type: AUTH_USER });
            })
            .then(() => {
                callback()
            })
            .catch((err) => {
                dispatch(authError(err.response.data.non_field_errors));
            });
    }
}

export function getCurrentUser(token) {
    return function(dispatch) {
        axios({ 
            method: 'get',
            url: `${ROOT_URL}/api/current/user/`,
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
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

export function signupUser(values){
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/registration/`, values)
            .then(() => {
                dispatch(authSuccess("Successfully Sing in"));
            })
            .catch((err) => {
                dispatch(authError(err.response.data.detail));
            });
    }
}

export function authSuccess(msg) {
    return {
        type: AUTH_SUCCESS,
        payload: msg
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }; 
}

export function logoutUser() {
    return function(dispatch) {
        axios({ 
            method: 'post',
            url: `${ROOT_URL}/api/auth/logout/`,
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            localStorage.removeItem('token');
            localStorage.removeItem('is_staff');
            dispatch({ type: UNAUTH_USER });
        })
        .catch((err) => {
            dispatch(authError("BAD LOGOUT"));
            // dispatch(authError(err.response.data.non_field_errors));
        });
    }
    // axios.post(`${ROOT_URL}/api/auth/logout/`)
    // localStorage.removeItem('token');
    // localStorage.removeItem('is_staff');
    // return { type: UNAUTH_USER };
}