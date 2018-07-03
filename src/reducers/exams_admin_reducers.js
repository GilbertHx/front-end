import _ from 'lodash';
import { FETCH_EXAMS, PUBLISH_EXAM, DELETE_EXAM, CREATE_EXAM, EXAM_ERROR } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case CREATE_EXAM:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_EXAMS:
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
        case EXAM_ERROR:
            return {...state, error: action.payload };
        default:
            return state;
    }
}