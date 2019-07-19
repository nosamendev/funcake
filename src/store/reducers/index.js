import { combineReducers } from 'redux';
import cakesReducer from './cakesReducer';
import modalReducer from './modalReducer';


export default combineReducers({
    cakesReducer: cakesReducer,
    modalReducer: modalReducer
});