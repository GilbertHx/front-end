import axios from 'axios';

import { 
    FETCH_USERS, FETCH_SINGLE_USER, ACTIVATE_USER, DEACTIVATE_USER, MAKE_USER_STAFF, MAKE_USER_STUDENT,
    IN_CLASS_STAGE, EXAM_COMPLETED_STAGE, GRADUATED_STAGE, FETCH_CURRENT_USER_PROFILE, EDIT_PROFILE, UNGRADUATED_STAGE, GENERATE_CERTIFICATE, DELETE_CERTIFICATE,
    CREATE_USER_COMMENT,
} from './types';

import history from '../utils/history';
import { ROOT_URL } from '../config/api_settings';

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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_SINGLE_USER,
        payload: request
    };
}

export function fetchCurrentUserProfile(id) {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/current/user/`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_CURRENT_USER_PROFILE,
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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
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
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });

    return {
        type: MAKE_USER_STUDENT,
        payload: request
    }
}

export function inClasssStage() {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/user/create/stage/`,
        data: {
            user_stage: "I"
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    })

    return {
        type: IN_CLASS_STAGE,
        payload: request
    }
}

export function examCompletedStage() {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/user/create/stage/`,
        data: {
            user_stage: "U"
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    })

    return {
        type: EXAM_COMPLETED_STAGE,
        payload: request
    }
}

export function graduateStudent(user) {
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/user/admin/create/stage/`,
            data: {
                current_user: user,
                user_stage: "G"
            },
            headers :{
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => {
            dispatch({ 
                type: GRADUATED_STAGE,
                payload: response
            });
            history.push(`/admin/users`);
        }).then(() => {
            dispatch(generateCertificate(user));
        });
    }
    // const request = axios({
    //     method: 'post',
    //     url: `${ROOT_URL}/api/user/admin/create/stage/`,
    //     data: {
    //         current_user: user,
    //         user_stage: "G"
    //     },
    //     headers :{
    //         Accept: 'application/json',
    //         Authorization: `Token ${localStorage.getItem('token')}`,
    //     }
    // }).then(() => {
    //     history.push(`/admin/users`);
    // });

    // return {
    //     type: GRADUATED_STAGE,
    //     payload: request
    // }
}

export function ungraduateStudent(user, certificate) {

    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/user/admin/create/stage/`,
            data: {
                current_user: user,
                user_stage: "U"
            },
            headers :{
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => {
            dispatch({ 
                type: UNGRADUATED_STAGE,
                payload: response
            });
            history.push(`/admin/users`);
        }).then(() => {
            dispatch(deleteCertificate(user, certificate));
        });
    }

    // const request = axios({
    //     method: 'post',
    //     url: `${ROOT_URL}/api/user/admin/create/stage/`,
    //     data: {
    //         current_user: user,
    //         user_stage: "U"
    //     },
    //     headers :{
    //         Accept: 'application/json',
    //         Authorization: `Token ${localStorage.getItem('token')}`,
    //     }
    // }).then(() => {
    //     history.push(`/admin/users`);
    // });

    // return {
    //     type: UNGRADUATED_STAGE,
    //     payload: request
    // }
}

export function editProfile(values, id) {
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/profile/${id}/update/`,
        data: values,
        headers : {
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      }).then(() => {
        history.push(`/profile/${id}`);
      });
    return {
        type: EDIT_PROFILE,
        payload: request
    };
}

export function generateCertificate(user) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/certificate/generate/`,
        data : {
            current_user: user
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: GENERATE_CERTIFICATE,
        payload: request
    };
}

export function deleteCertificate(user, certificate) {
    const request = axios({
        method: 'delete',
        data: {
            current_user: user
        },
        url: `${ROOT_URL}/api/certificate/delete/${certificate}`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_CERTIFICATE,
        payload: request
    };
}

export function createUserComment(user, values) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/comment/user/create/`,
        data: {
            current_user: user,
            comment: values.comment
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: CREATE_USER_COMMENT,
        payload: request
    }
}