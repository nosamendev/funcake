import { REMOVING_PRODUCT, NOT_REMOVING_PRODUCT } from '../actions/types';

const INITIAL_STATE = {
    removing: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REMOVING_PRODUCT:
            return {...state, removing: action.payload};
        case NOT_REMOVING_PRODUCT:
            return {...state, removing: action.payload};
        default:
            return state;
    }
}