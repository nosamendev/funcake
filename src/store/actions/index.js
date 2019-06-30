import { FETCH_CAKES_START, FETCH_CAKES, FETCH_CAKES_FAILED } from '../actions/types';

import cakes from '../../api/cakes';
import axios from 'axios';



export const fetchCakes = () => async dispatch => {
    dispatch({type: FETCH_CAKES_START});

    try {
        const response = await cakes.get('/store.json1');
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