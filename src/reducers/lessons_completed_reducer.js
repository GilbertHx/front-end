import _ from 'lodash';
import { FETCH_COMPLETED_LESSON } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_COMPLETED_LESSON:
            return _.mapKeys(action.payload.data, 'lesson');
        default: 
            return state;
    }
}