import _ from 'lodash';
import { FETCH_ALL_ASSESSMENTS, FETCH_UNIT_ASSESSMENTS,  CREATE_ASSESSMENT, DELETE_ASSESSMENT } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_ALL_ASSESSMENTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_UNIT_ASSESSMENTS:
            return _.mapKeys(action.payload.data.assessments, 'id');
        case CREATE_ASSESSMENT:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ASSESSMENT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}