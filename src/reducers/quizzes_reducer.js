import _ from 'lodash';
import { FETCH_ALL_QUIZ, CREATE_QUIZ, CREATE_ANSWER, DELETE_QUIZ } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case CREATE_ANSWER:
            return { ...state,
                [action.payload.data.quiz]: {
                    ...state[action.payload.data.quiz],
                    answers: {
                    ...state[action.payload.data.quiz].answers,
                    [action.payload.data.id]: action.payload.data
                }
            }}
        case CREATE_QUIZ:
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_ALL_QUIZ:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_QUIZ:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}