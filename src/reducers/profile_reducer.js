import { FETCH_SINGLE_USER, CREATE_USER_COMMENT,  ACTIVATE_USER, DEACTIVATE_USER, MAKE_USER_STAFF, MAKE_USER_STUDENT } from '../actions/types';

export default function(state = {}, action){
    switch(action.type) {
        case FETCH_SINGLE_USER:
            return  action.payload.data;
        case ACTIVATE_USER:
            return {...state, is_active: true}
        case DEACTIVATE_USER:
            return {...state, is_active: false}
        case MAKE_USER_STAFF:
            return {...state, is_staff: true}
        case MAKE_USER_STUDENT:
            return {...state, is_staff: false}
        case CREATE_USER_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload.data]
            }
        default: 
            return state;
    }
}