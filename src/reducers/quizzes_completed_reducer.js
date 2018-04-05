import _ from 'lodash';
import { FETCH_COMPLETED_QUIZZES } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_COMPLETED_QUIZZES:
            return _.mapKeys(action.payload.data, 'quiz');
        default:
            return state;
    }
}