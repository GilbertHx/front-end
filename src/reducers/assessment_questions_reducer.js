import _ from 'lodash';
import { FETCH_SINGLE_ASSESSMENT_QUESTION, FETCH_SINGLE_ASSESSMENT_QUESTION_ADMIN, CREATE_ASSESSMENT_QUESTION,  DELETE_ASSESSMENT_QUESTION, UPDATE_ASSESSMENT_QUESTION_STATUS  } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_SINGLE_ASSESSMENT_QUESTION_ADMIN:
            return _.mapKeys(action.payload.data.questions, 'id');
        case FETCH_SINGLE_ASSESSMENT_QUESTION:
            let questions = action.payload.data.questions
            var undoneQuestions = questions.filter(function(obj){
                if (obj.done[0] !== undefined){
                    return obj.done[0].done === false
                }else {
                    return obj
                }
            })
            return _.mapKeys(undoneQuestions, 'id');
        case CREATE_ASSESSMENT_QUESTION:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ASSESSMENT_QUESTION:
            return _.omit(state, action.payload);
        case UPDATE_ASSESSMENT_QUESTION_STATUS:
            return _.omit(state, action.payload.data.question);
        default: 
            return state;
    }
}