import { FETCH_ASSESSMENT_QUESTION_RESPONSES, CREATE_ASSESSMENT_RESPONSE } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case CREATE_ASSESSMENT_RESPONSE:
            return { ...state,
                [action.payload.data.question]: {
                    ...state[action.payload.data.question],
                    responses: {
                    ...state[action.payload.data.question].responses,
                    [action.payload.data.id]: action.payload.data
                }
            }}
        case FETCH_ASSESSMENT_QUESTION_RESPONSES:
            return {[action.payload.data.id]: action.payload.data};
        default: 
            return state;
    }
}