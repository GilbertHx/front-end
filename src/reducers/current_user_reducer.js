import { GET_CURRENT_USER } from '../actions/types';

const initialState = {}

export default function(state = initialState, action){
    switch(action.type) {
        case GET_CURRENT_USER:
            return action.payload.data
        default:
            return state;
    }
}