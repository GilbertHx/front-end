import axios from 'axios';

import { 
    CREATE_EXAM, FETCH_EXAMS, FETCH_EXAM_QUESTION, DELETE_EXAM, PUBLISH_EXAM, FETCH_PUBLISHED_EXAMS,
    CREATE_EXAM_QUESTION, FETCH_QUESTIONS, FETCH_EXAM_ADMIN_QUESTION, DELETE_QUESTION, CREATE_EXAM_QUESTION_STATUS, UPDATE_EXAM_QUESTION_STATUS,
    CREATE_RESPONSE, FETCH_QUESTION_RESPONSES,
    CREATE_EXAM_MARK, FETCH_ALL_EXAM_MARKS,
    EXAM_ERROR,
} from './types';

import { ROOT_URL } from '../config/api_settings';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function fetchExams() {
    const request = axios.get(`${ROOT_URL}/api/exam/`);
    return {
        type: FETCH_EXAMS,
        payload: request
    };
}

export function fetchPublishedExams() {
    const request = axios.get(`${ROOT_URL}/api/exam/published/`);
    return {
        type: FETCH_PUBLISHED_EXAMS,
        payload: request
    };
}

export function createExam(values) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/create/`,
        data: values,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });
    return {
        type: CREATE_EXAM,
        payload: request
    }
}

export function publishExam(published, id){
    const request = axios({
        method: 'put',
        url: `${ROOT_URL}/api/exam/${id}/update/`,
        data: {
            published
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: PUBLISH_EXAM,
        payload: request
    }
}
export function deleteExam(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/exam/${id}/delete`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_EXAM,
        payload: id
    }
}

// Exam Question
export function fetchQuestions() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/exam/questions/`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_QUESTIONS,
        payload: request
    };
}

export function fetchExamAdminQuestions(id) {
    // const request = axios.get(`${ROOT_URL}/api/exam/admin/detail/${id}`);
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/exam/admin/detail/${id}/`,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_EXAM_ADMIN_QUESTION,
        payload: request
    };
}

export function fetchExamQuestions(id) {
    // const request = axios.get(`${ROOT_URL}/api/exam/detail/${id}`);
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/exam/detail/${id}/`,
        headers: {
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: FETCH_EXAM_QUESTION,
        payload: request
    };
}

export function createQuestionStatusQuestion(question) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/question/status/create/`,
        data: {
            question,
            done: false,
            completed: false,
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });
    return {
        type: CREATE_EXAM_QUESTION_STATUS,
        payload: request
    }
}

export function createExamQuestion(values, exam_id) {
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/exam/question/create/`,
            data: {
                exam: exam_id,
                label: values.label,
                marks: values.marks
            },
            headers :{
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            },
        }).then(response => {
            dispatch({
                type: CREATE_EXAM_QUESTION,
                payload: response
            });
        }).catch((err) => {
            console.log(err.response.data.label[0])
            // dispatch(examError(err.response.data.label[0]));
        });
    }
}

export function deleteQuestion(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/exam/question/${id}/delete`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: DELETE_QUESTION,
        payload: id
    }
}

// Question Response
export function fetchQuestionResponses(id) {
    const request = axios.get(`${ROOT_URL}/api/exam/question/detail/${id}`);
    return {
        type: FETCH_QUESTION_RESPONSES,
        payload: request
    };
}

export function createQuestionResponse(values, question_id) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/response/create/`,
        data: {
            question: question_id,
            label: values.label,
            correct: values.correct
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        },
    });
    return {
        type: CREATE_RESPONSE,
        payload: request
    }
}

export function updateQuestionStatusQuestion(completed, done, question, exam) {
    return function(dispatch) {
        axios({
            method: 'post',
            url: `${ROOT_URL}/api/exam/question/status/create/`,
            data: {
                completed,
                question,
                done
            },
            headers :{
                Accept: 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            dispatch({ 
                type: UPDATE_EXAM_QUESTION_STATUS,
                payload: response
             });
        })
        .then(() => {
            dispatch(examMarkCreate(exam));
        });
    }

    // const request = axios({
    //     method: 'post',
    //     url: `${ROOT_URL}/api/exam/question/status/create/`,
    //     data: {
    //         completed,
    //         question,
    //         done
    //     },
    //     headers :{
    //         Accept: 'application/json',
    //         Authorization: `Token ${localStorage.getItem('token')}`,
    //     }
    // })
    // .then(() => {
    //     callback()
    // });
    // return {
    //     type: UPDATE_EXAM_QUESTION_STATUS,
    //     payload: request
    // }
}

export function examMarkCreate(exam) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/mark/create/`,
        data: {
            exam
        },
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    return {
        type: CREATE_EXAM_MARK,
        payload: request
    }
}

export function fetchAllExamMarks() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/exam/marks/admin/`,
        headers :{
            Accept: 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });

    return {
        type: FETCH_ALL_EXAM_MARKS,
        payload: request
    }
}

export function examError(error) {
    return {
        type: EXAM_ERROR,
        payload: error
    }; 
}