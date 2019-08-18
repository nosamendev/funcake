import { FETCH_MY_ORDERS_START, FETCH_MY_ORDERS, FETCH_MY_ORDERS_FAILED } from '../actions/types';

const INITIAL_STATE = {
    error: false,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MY_ORDERS_START:
            return {...state, loading: true};
        case FETCH_MY_ORDERS:
            return {...state, loading: false, orders: action.payload};
        case FETCH_MY_ORDERS_FAILED:
            return {...state, loading: false, error: true};
        default:
            return state;
    }
}