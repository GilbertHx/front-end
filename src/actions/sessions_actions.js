import axios from 'axios';

import { 
    FETCH_SESSIONS, CREATE_SESSION, DELETE_SESSION
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';

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
        headers
      });
    return {
        type: CREATE_SESSION,
        payload: request
    };
}

export function deleteSession(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/course/session/${id}/delete`,
        headers
    });
    return {
        type: DELETE_SESSION,
        payload: id
    }
}