import { CREATE_RESPONSE, FETCH_QUESTION_RESPONSES } from '../actions/types';   

export default function(state = {}, action){
    switch(action.type) {
        case CREATE_RESPONSE:
            return { ...state,
                [action.payload.data.question]: {
                    ...state[action.payload.data.question],
                    responses: {
                    ...state[action.payload.data.question].responses,
                    [action.payload.data.id]: action.payload.data
                }
            }}
        case FETCH_QUESTION_RESPONSES:
            return {[action.payload.data.id]: action.payload.data};
        default: 
            return state;
    }
}