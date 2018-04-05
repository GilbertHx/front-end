import axios from 'axios';

import { 
    FETCH_ALL_ASSESSMENTS, CREATE_ASSESSMENT, DELETE_ASSESSMENT, FETCH_SINGLE_ASSESSMENT_QUESTION, FETCH_SINGLE_ASSESSMENT_QUESTION_ADMIN, FETCH_ALL_ASSESSMENT_QUESTIONS, DELETE_ASSESSMENT_QUESTION, CREATE_ASSESSMENT_QUESTION,
    FETCH_ASSESSMENT_QUESTION_RESPONSES, CREATE_ASSESSMENT_RESPONSE, FETCH_UNIT_ASSESSMENTS, CREATE_ASSESSMENT_QUESTION_STATUS, CREATE_ASSESSMENT_ESSAY_RESPONSE,
    UPDATE_ASSESSMENT_QUESTION_STATUS, CREATE_ASSESSMENT_MARK, FETCH_ALL_ASSESSMENT_MARKS,
} from './types';

import { ROOT_URL, headers } from '../config/api_settings';

export function fetchAllAssessments() {
    const request = axios.get(`${ROOT_URL}/api/assessment/`);
    return {
        type: FETCH_ALL_ASSESSMENTS,
        payload: request
    };
}

export function fetchUnitAssessments(id) {
    const request = axios.get(`${ROOT_URL}/api/course/unit/detail/${id}/`);
    return {
        type: FETCH_UNIT_ASSESSMENTS,
        payload: request
    };
}

export function createAssessment(values) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/create/`,
        data: values,
        headers,
    });
    return {
        type: CREATE_ASSESSMENT,
        payload: request
    }
}

export function deleteAssessment(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/assessment/${id}/delete`,
        headers
    });
    return {
        type: DELETE_ASSESSMENT,
        payload: id
    }
}

export function fetchAllAssessmentQuestions() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/assessment/questions/`,
        headers
    });
    return {
        type: FETCH_ALL_ASSESSMENT_QUESTIONS,
        payload: request
    };
}
export function fetchSingleAssessmentQuestions(id) {
    const request = axios.get(`${ROOT_URL}/api/assessment/detail/${id}`);
    return {
        type: FETCH_SINGLE_ASSESSMENT_QUESTION,
        payload: request
    };
}

export function fetchSingleAssessmentQuestionsAdmin(id) {
    const request = axios.get(`${ROOT_URL}/api/assessment/detail/${id}`);
    return {
        type: FETCH_SINGLE_ASSESSMENT_QUESTION_ADMIN,
        payload: request
    };
}

export function createQuestionStatusQuestion(question) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/question/status/create/`,
        data: {
            question,
            done: false,
            completed: false,
        },
        headers,
    });
    return {
        type: CREATE_ASSESSMENT_QUESTION_STATUS,
        payload: request
    }
}

export function createAssessmentQuestion(values, assessment_id) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/question/create/`,
        data: {
            assessment: assessment_id,
            label: values.label,
            marks: values.marks
        },
        headers,
    });
    return {
        type: CREATE_ASSESSMENT_QUESTION,
        payload: request
    }
}

export function deleteAssessmentQuestion(id) {
    axios({
        method: 'delete',
        url: `${ROOT_URL}/api/assessment/question/${id}/delete`,
        headers
    });
    return {
        type: DELETE_ASSESSMENT_QUESTION,
        payload: id
    }
}

export function fetchAssessmentQuestionResponses(id) {
    const request = axios.get(`${ROOT_URL}/api/assessment/question/detail/${id}`);
    return {
        type: FETCH_ASSESSMENT_QUESTION_RESPONSES,
        payload: request
    };
}

export function createAssessmentQuestionResponse(values, question_id) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/response/create/`,
        data: {
            question: question_id,
            label: values.label,
            correct: values.correct
        },
        headers,
    });
    return {
        type: CREATE_ASSESSMENT_RESPONSE,
        payload: request
    }
}

export function createAssessmentQuestionEssayResponse(values, question_id) {

    let formData = new FormData();
    formData.append('essay', values.essay[0], values.essay[0].name);
    formData.append('question', question_id);

    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/essay/response/create/`,
        data: formData,
        headers
      });
    return {
        type: CREATE_ASSESSMENT_ESSAY_RESPONSE,
        payload: request
    };
}

export function updateQuestionStatusQuestion(completed, done, question) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/question/status/create/`,
        data: {
            completed,
            question,
            done
        },
        headers
    });
    return {
        type: UPDATE_ASSESSMENT_QUESTION_STATUS,
        payload: request
    }
}

export function assessmentMarkCreate(assessment, callback) {
    const request = axios({
        method: 'post',
        url: `${ROOT_URL}/api/assessment/mark/create/`,
        data: {
            assessment
        },
        headers
    }).then(() => callback());
    return {
        type: CREATE_ASSESSMENT_MARK,
        payload: request
    }
}

export function fetchAllAssessmentMarks() {
    const request = axios({
        method: 'get',
        url: `${ROOT_URL}/api/assessment/marks/admin/`,
        headers
    });

    return {
        type: FETCH_ALL_ASSESSMENT_MARKS,
        payload: request
    }
}

export function retakeAssessment(assessment_id) {
    return function(dispatch) {
        axios({
            method: 'put',
            url: `${ROOT_URL}/api/assessment/${assessment_id}/retake/`,
            headers
        })
        .then(() => {
            dispatch(fetchSingleAssessmentQuestions(assessment_id))
        })
    }
}