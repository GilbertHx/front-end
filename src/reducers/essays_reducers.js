import _ from 'lodash';
import { FETCH_ALL_ESSAYS, FETCH_SINGLE_ESSAY } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_ALL_ESSAYS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_SINGLE_ESSAY:
            return action.payload.data
        default:
         return state;
    }
}