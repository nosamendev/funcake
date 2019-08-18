import { SAVE_ORDER_START, SAVE_ORDER, SAVE_ORDER_FAILED } from '../actions/types'; 

const INITIAL_STATE = {
    error: null,
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_ORDER_START:
            return {...state, loading: true};
        case SAVE_ORDER:
            return {...state, error: false, loading: false};
        case SAVE_ORDER_FAILED:
            return {...state,  error: true, loading: false};
        default:
            return state;
    }
}