import _ from 'lodash';
import { FETCH_SESSIONS, CREATE_SESSION, DELETE_SESSION } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case CREATE_SESSION:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_SESSIONS:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_SESSION:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}