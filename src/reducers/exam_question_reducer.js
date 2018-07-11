import _ from 'lodash';
import { FETCH_EXAM_ADMIN_QUESTION, CREATE_EXAM_QUESTION, DELETE_QUESTION, FETCH_EXAM_QUESTION, UPDATE_EXAM_QUESTION_STATUS } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_EXAM_QUESTION:
            let questions = action.payload.data.questions
                var undoneQuestions = questions.filter(function(obj){
                    if (obj.done[0] !== undefined){
                        return obj.done[0].done === false
                    }else {
                        return obj
                    }
                })
            return undoneQuestions;
        case UPDATE_EXAM_QUESTION_STATUS:
            let index = state.findIndex((x) => x.id === action.payload.data.question);
            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ]
        case FETCH_EXAM_ADMIN_QUESTION:
            return _.mapKeys(action.payload.data.questions, 'id');
        case CREATE_EXAM_QUESTION:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_QUESTION:
            return _.omit(state, action.payload);
        case UPDATE_EXAM_QUESTION_STATUS:
            return _.omit(state, action.payload.data.question);
        default: 
            return state;
    }
}