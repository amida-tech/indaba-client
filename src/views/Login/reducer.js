import * as actionTypes from './actionTypes';

export default (state, action) => {
    switch (action.type) {
    case actionTypes.LOGIN: {
        return state;
    }
    case actionTypes.LOGIN_SUCCESS: {
        return state;
    }
    case actionTypes.LOGIN_ERROR: {
        return state;
    }
    default:
        return state;
    }
};
