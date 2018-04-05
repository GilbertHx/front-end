import axios from 'axios';

import { 
    CREATE_EXAM, FETCH_EXAMS, FETCH_EXAM_QUESTION, DELETE_EXAM, PUBLISH_EXAM, FETCH_PUBLISHED_EXAMS,
    CREATE_EXAM_QUESTION, FETCH_QUESTIONS, DELETE_QUESTION, CREATE_EXAM_QUESTION_STATUS, UPDATE_EXAM_QUESTION_STATUS,
    CREATE_RESPONSE, FETCH_QUESTION_RESPONSES,
    CREATE_EXAM_MARK, FETCH_ALL_EXAM_MARKS,
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';

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
        headers,
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
        headers
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
        headers
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
        headers
    });
    return {
        type: FETCH_QUESTIONS,
        payload: request
    };
}

export function fetchExamQuestions(id) {
    const request = axios.get(`${ROOT_URL}/api/exam/detail/${id}`);
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
        headers,
    });
    return {
        type: CREATE_EXAM_QUESTION_STATUS,
        payload: request
    }
}

export function createExamQuestion(values, exam_id) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/question/create/`,
        data: {
            exam: exam_id,
            label: values.label,
            marks: values.marks
        },
        headers,
    });
    return {
        type: CREATE_EXAM_QUESTION,
        payload: request
    }
}

export function deleteQuestion(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/exam/question/${id}/delete`,
        headers
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
        headers,
    });
    return {
        type: CREATE_RESPONSE,
        payload: request
    }
}

export function updateQuestionStatusQuestion(completed, done, question) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/question/status/create/`,
        data: {
            completed,
            question,
            done
        },
        headers
    });
    return {
        type: UPDATE_EXAM_QUESTION_STATUS,
        payload: request
    }
}

export function examMarkCreate(exam, callback) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/exam/mark/create/`,
        data: {
            exam
        },
        headers
    }).then(() => callback());
    return {
        type: CREATE_EXAM_MARK,
        payload: request
    }
}

export function fetchAllExamMarks() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/exam/marks/admin/`,
        headers
    });

    return {
        type: FETCH_ALL_EXAM_MARKS,
        payload: request
    }
}