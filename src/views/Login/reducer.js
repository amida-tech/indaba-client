import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

const initialState = {
    ui: {
        error: '',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.LOGIN: {
        return state;
    }
    case actionTypes.LOGIN_SUCCESS:
        return state;
    case actionTypes.LOGIN_ERROR:
        return update(state, { ui: { error: { $set: action.error } } });
    case actionTypes.GET_CURRENT_USER_FAILURE:
        return update(state, { ui: { error: { $set: action.error } } });
    case actionTypes.GET_USERS_FAILURE:
        return update(state, { ui: { error: { $set: action.error } } });
    default:
        return state;
    }
};
