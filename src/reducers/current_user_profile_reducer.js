import { FETCH_CURRENT_USER_PROFILE } from '../actions/types';

const initialState = {}

export default function(state = initialState, action){
    switch(action.type) {
        case FETCH_CURRENT_USER_PROFILE:
            return action.payload.data
        default:
         return state;
    }
}