import cakesReducer from './cakesReducer';
import { FETCH_CAKES, FETCH_CAKES_START, FETCH_CAKES_FAILED } from "../actions/types";

describe('cakesReducer', () => {
    it('should return the initial state', () => {
        expect(cakesReducer(undefined, {})).toEqual({
            error: false,
            loading: false,
            description: ''
        });
    });

    
});