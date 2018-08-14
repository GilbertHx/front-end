import axios from 'axios';

import { 
    FETCH_ALL_QUIZ, CREATE_QUIZ, DELETE_QUIZ, CREATE_QUIZ_COMPLETIONS, FETCH_COMPLETED_QUIZZES, FETCH_SINGLE_QUIZ, CREATE_ANSWER
} from './types';

import { ROOT_URL } from '../config/api_settings';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function fetchAllQuizzes() {
    const request = axios.get(`${ROOT_URL}/api/quiz/list/`);
    return {
        type: FETCH_ALL_QUIZ,
        payload: request
    };
}

export function createQuiz(values) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/quiz/create/`,
        data: values,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    })
    return {
        type: CREATE_QUIZ,
        payload: request
    }
}

export function deleteQuiz(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/quiz/${id}/delete`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_QUIZ,
        payload: id
    }
}

export function quizCompleteOperation(completed, quiz) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/quiz/completed/create/`,
        data: {
            completed,
            quiz
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: CREATE_QUIZ_COMPLETIONS,
        payload: request
    }
}

// Answers
export function fetchQuizzesCompleted() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/quiz/completed/list/`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_COMPLETED_QUIZZES,
        payload: request
    }
}

export function createAnswer(values) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/quiz/answer/create/`,
        data: values,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });
    return {
        type: CREATE_ANSWER,
        payload: request
    }
}

export function fetchQuizAnswers(id) {
    const request = axios.get(`${ROOT_URL}/api/quiz/detail/${id}`);
    return {
        type: FETCH_SINGLE_QUIZ,
        payload: request
    };
}