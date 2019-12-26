import { CART_LOADED, CART_EMPTY } from '../actions/types';

export const loadCart = () => {
    return {
        type: CART_LOADED,
        payload: true
    }
}

export const emptyCart = () => {
    return {
        type: CART_EMPTY,
        payload: false
    }
}