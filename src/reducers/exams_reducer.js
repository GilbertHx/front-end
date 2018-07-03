import _ from 'lodash';
import { FETCH_PUBLISHED_EXAMS } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_PUBLISHED_EXAMS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}