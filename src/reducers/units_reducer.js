import _ from 'lodash';
import { FETCH_UNITS, CREATE_UNIT, DELETE_UNIT } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case CREATE_UNIT:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_UNITS:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_UNIT:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}