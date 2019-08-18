import { combineReducers } from 'redux';
import cakesReducer from './cakesReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';
import saveOrderReducer from './saveOrderReducer';
import myOrdersReducer from './myOrdersReducer';
import removeProductReducer from './removeProductReducer';

export default combineReducers({
    cakesReducer: cakesReducer,
    modalReducer: modalReducer,
    authReducer: authReducer,
    saveOrderReducer: saveOrderReducer,
    myOrdersReducer: myOrdersReducer,
    removeProductReducer: removeProductReducer
});