import { REMOVING_PRODUCT, NOT_REMOVING_PRODUCT } from '../actions/types';

export const removingProduct = () => {
    return {
        type: REMOVING_PRODUCT,
        payload: true
    }
}

export const notRemovingProduct = () => {
    return {
        type: NOT_REMOVING_PRODUCT,
        payload: false
    }
}