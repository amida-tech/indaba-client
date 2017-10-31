import * as actionTypes from './actionTypes';

export const resetState = (state, action) => {
    return {
        type: actionTypes.RESET_STATE
    };
};
