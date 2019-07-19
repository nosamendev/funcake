import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const INITIAL_STATE = {
    isModalOpen: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {...state, isModalOpen: action.payload};
        case CLOSE_MODAL:
            return {...state, isModalOpen: action.payload};
        default:
            return state;
    }
}