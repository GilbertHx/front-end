import axios from 'axios';

import { 
    FETCH_SESSIONS, CREATE_SESSION, EDIT_SESSION, DELETE_SESSION
} from './types';

import history from '../utils/history';
import { ROOT_URL } from '../config/api_settings';

export function fetchSessions() {
    const request = axios.get(`${ROOT_URL}/api/course/sessions`);
    return {
        type: FETCH_SESSIONS,
        payload: request
    };
}

export function createSession(values) {
    let formData = new FormData();
    formData.append('unit', values.unit);
    formData.append('image', values.image[0], values.image[0].name);
    formData.append('title', values.title);
    formData.append('description', values.description);

    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/course/session/create/`,
        data: formData,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      });
    return {
        type: CREATE_SESSION,
        payload: request
    };
}

export function editSession(values, id) {
    let formData = new FormData();
    formData.append('unit', values.unit);
    formData.append('image', values.image[0], values.image[0].name);
    formData.append('title', values.title);
    formData.append('description', values.description);

    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/course/session/${id}/edit/`,
        data: formData,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
      }).then(() => {
        history.push('/admin/sections');
      });
    return {
        type: EDIT_SESSION,
        payload: request
    };
}


export function deleteSession(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/course/session/${id}/delete`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_SESSION,
        payload: id
    }
}