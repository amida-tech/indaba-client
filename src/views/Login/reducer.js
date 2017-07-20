import * as actionTypes from './actionTypes';

export default (state, action) => {
    switch (action.type) {
    case actionTypes.LOGIN: {
        console.log('LET THE LOGS Begin');
        return state;
    }
    default:
        return state;
    }
};
