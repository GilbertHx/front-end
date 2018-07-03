import _ from 'lodash';
import { FETCH_COMPLETED_QUIZZES, CREATE_QUIZ_COMPLETIONS } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_COMPLETED_QUIZZES:
            return _.mapKeys(action.payload.data, 'quiz');
        case CREATE_QUIZ_COMPLETIONS:
            return {...state,
                [action.payload.data.quiz]: {
                completed: action.payload.data.completed
                }
            }
        default:
            return state;
    }
}