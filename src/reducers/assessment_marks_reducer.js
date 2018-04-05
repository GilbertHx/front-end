import _ from 'lodash';
import { FETCH_ALL_ASSESSMENT_MARKS } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_ALL_ASSESSMENT_MARKS:
            return  _.mapKeys(action.payload.data, 'current_user');
        default: 
            return state;
    }
}