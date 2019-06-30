import { FETCH_CAKES, FETCH_CAKES_START, FETCH_CAKES_FAILED } from "../actions/types";

const INITIAL_STATE = {
    error: false,
    loading: false,
    description: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CAKES:
            return {...state, ...action.payload, loading: false};       
        case FETCH_CAKES_START:
            return {...state, loading: true}
        case FETCH_CAKES_FAILED:
                return {...state, loading: false, description: action.payload, error: true}    

        default:
            return state;
    }
}