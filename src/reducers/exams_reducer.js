import _ from 'lodash';
import { FETCH_EXAMS, FETCH_PUBLISHED_EXAMS, CREATE_EXAM, DELETE_EXAM, PUBLISH_EXAM } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_EXAMS:
            return _.mapKeys(action.payload.data, 'id');
        case CREATE_EXAM:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_PUBLISHED_EXAMS:
            return _.mapKeys(action.payload.data, 'id');
        case PUBLISH_EXAM:
            return { ...state,
                [action.payload.data.id]: {
                    ...state[action.payload.data.id],
                    published: action.payload.data.published
                }
            }
        case DELETE_EXAM:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}