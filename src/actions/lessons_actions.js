import axios from 'axios';

import { 
    FETCH_LESSONS, CREATE_LESSON, FETCH_SESSION_LESSONS, FETCH_LESSON, DELETE_LESSON, FETCH_COMPLETED_LESSON, CREATE_LESSON_COMPLETIONS
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';


export function fetchLessons() {
    const request = axios.get(`${ROOT_URL}/api/course/lessons/`);
    return {
        type: FETCH_LESSONS,
        payload: request
    };
}

export function createLesson(values) {
    let formData = new FormData();
    formData.append('audio', values.audio[0], values.audio[0].name);
    formData.append('title', values.title);
    formData.append('session', values.session);
    formData.append('lesson_index', values.lesson_index);
    formData.append('description', values.description);
    formData.append('content', values.content);
    formData.append('video_url', values.video_url);
    
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/course/lesson/create/`,
        data: formData,
        headers
      });
    return {
        type: CREATE_LESSON,
        payload: request
    };
}

export function fetchSessionLessons(id) {
    const request = axios.get(`${ROOT_URL}/api/course/session/detail/${id}`);
    return {
        type: FETCH_SESSION_LESSONS,
        payload: request
    };
}

export function fetchLesson(id) {
    const request = axios.get(`${ROOT_URL}/api/course/lesson/detail/${id}`);
    return {
        type: FETCH_LESSON,
        payload: request
    };
}

export function deleteLesson(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/course/lesson/${id}/delete`,
        headers
    });
    return {
        type: DELETE_LESSON,
        payload: id
    }
}

export function fetchLessonsCompleted() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/course/completed/lessons/`,
        headers
    });
    return {
        type: FETCH_COMPLETED_LESSON,
        payload: request
    }
}

export function lessonCompleteOperation(completed, lesson, callback) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/course/completed/lesson/create/`,
        data: {
            completed,
            lesson
        },
        headers
    }).then(() => callback());
    return {
        type: CREATE_LESSON_COMPLETIONS,
        payload: request
    }
}