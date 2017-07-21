import * as actionTypes from './actionTypes';

export default (state, action) => {
    switch (action.type) {
    case actionTypes.LOGIN: {
        return state;
    }
    default:
        return state;
    }
};
