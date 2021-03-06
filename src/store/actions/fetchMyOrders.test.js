import { FETCH_MY_ORDERS_START, FETCH_MY_ORDERS, FETCH_MY_ORDERS_FAILED } from '../actions/types';
import fetchMyOrders from './fetchMyOrders';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({});

describe('Testing fetchMyOrders()', () => {

    beforeEach(() => { // Runs before each test in the suite
        store.clearActions();
    });

    it('should get MY ORDERS', () => {
        mock.onGet('/orders.json').reply(200, {
            data: [
                { cakes: [{dateNumber: '1', date: 'someDate', price: '3.00', quantity: '1', title:'Banana'}], customer: 'test@test.com', userId: 'someId' }
            ]
        });

        store.dispatch(fetchMyOrders('someToken', 'someUseId')).then(() => {
            let expectedActions = [{
                type: FETCH_MY_ORDERS,
                payload: {
                    data: [
                        { cakes: [{dateNumber: '1', date: 'someDate', price: '3.00', quantity: '1', title:'Banana'}], customer: 'test@test.com', userId: 'someId' }
                    ]
                }
            }]
            expect(store.getActions()).toEqual(expectedActions);
        });
    
    });

});