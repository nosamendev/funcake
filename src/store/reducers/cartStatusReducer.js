import { CART_LOADED, CART_EMPTY } from "../actions/types";

const INITIAL_STATE = {
    isCartLoaded: false
};

const cartStatusReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CART_LOADED:
            return {...state, ...action.payload, isCartLoaded: true};       
        case CART_EMPTY:
            return {...state, isCartLoaded: false}

        default:
            return state;
    }
}

export default cartStatusReducer;