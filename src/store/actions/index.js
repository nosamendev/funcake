import { OPEN_MODAL, CLOSE_MODAL, 
    FETCH_CAKES_START, FETCH_CAKES, FETCH_CAKES_FAILED,
    CART_LOADED, CART_EMPTY } from '../actions/types';

import cakes from '../../api/cakes';
import axios from 'axios';

export const openModal = () => {
    return {
        type: OPEN_MODAL,
        payload: true
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
        payload: false
    }
}

export const fetchCakes = () => async dispatch => {
    dispatch({type: FETCH_CAKES_START});

    try {
        const response = await cakes.get('/store.json');
        dispatch({type: FETCH_CAKES, payload: response.data});
    }
    catch(error) {
        dispatch({type: FETCH_CAKES_FAILED, payload: error});     
    }
}

export const fetchCakesFailed = (error) => {
    return {
        type: FETCH_CAKES_FAILED,
        payload: error
    }
}
////////////////////////////////////////////

export {
    authSuccess,
    authFailed,
    logout,
    authEmail,
    auth,
    authCheckState
} from './auth.js';

export {
    saveOrder
} from './saveOrder.js';

export {
    fetchMyOrders,
    fetchMyOrdersFailed
} from './fetchMyOrders.js';

export {
    removingProduct,
    notRemovingProduct
} from './removeProduct.js';

export {
    loadCart,
    emptyCart
} from './cartStatus';
