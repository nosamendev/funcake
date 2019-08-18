import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, AUTH_EMAIL } from '../actions/types';

const INITIAL_STATE = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    email: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type){       
        case AUTH_START:
            return {...state, error: null, loading: true};
        case AUTH_SUCCESS:
            return {
                ...state, 
                token: action.idToken, 
                userId: action.userId,
                error: null,
                loading: false
            };
        case AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case AUTH_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        default:
            return state;
    }
};