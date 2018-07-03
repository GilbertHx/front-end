import axios from 'axios';

import { 
    FETCH_ALL_ESSAYS, FETCH_SINGLE_ESSAY, REVIEW_ESSAY
} from './types';

import { ROOT_URL } from '../config/api_settings';


export function fetchAllEssays() {
    // const request = axios.get(`${ROOT_URL}/api/assessment/essay/responses/`);
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/assessment/essay/responses/`,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_ALL_ESSAYS,
        payload: request
    };
}

export function fetchSingleEssay(id) {
    const request = axios.get(`${ROOT_URL}/api/assessment/essay/response/detail/${id}`);
    return {
        type: FETCH_SINGLE_ESSAY,
        payload: request
    }
}

export function ReviewEssay(values, essay_id) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/essay/rate/create/`,
        data: {
            essay: essay_id,
            rating: values.rating,
            comment: values.comment,
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });
    return {
        type: REVIEW_ESSAY,
        payload: request
    }
}