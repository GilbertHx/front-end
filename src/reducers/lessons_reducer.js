import _ from 'lodash';
import { FETCH_LESSONS, FETCH_LESSON,  CREATE_LESSON, FETCH_SESSION_LESSONS, DELETE_LESSON } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_LESSONS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_LESSON:
            return { ...state, [action.payload.data.id]: action.payload.data};
        case CREATE_LESSON:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_SESSION_LESSONS:
            return _.mapKeys(action.payload.data.lessons, 'id');
        case DELETE_LESSON:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}