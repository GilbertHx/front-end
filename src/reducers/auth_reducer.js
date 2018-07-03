import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, GET_CURRENT_USER } from '../actions/types';

const initialState = {}

export default function(state = initialState, action){
    switch(action.type) {
        case AUTH_USER:
            return {...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { initialState, authenticated: false, is_staff: false };
        case AUTH_ERROR:
            return {...state, error: action.payload };
        case GET_CURRENT_USER:
            return { ...state, is_staff: action.payload.data.is_staff }
        default:
         return state;
    }
}