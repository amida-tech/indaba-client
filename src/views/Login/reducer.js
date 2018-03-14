import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { LOG_OUT } from '../../common/actionTypes/navActionTypes';

const initialState = {
    ui: {
        error: '',
        timeoutRef: '',
        showForgotPasswordFor: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.LOGIN:
        return state;
    case actionTypes.LOGIN_SUCCESS:
        return update(state, { ui: { timeoutRef: { $set: '' } } });
    case actionTypes.LOGIN_ERROR:
        return update(state, { ui: { error: { $set: action.error } } });
    case actionTypes.GET_CURRENT_USER_FAILURE:
        return update(state, { ui: { error: { $set: action.error } } });
    case actionTypes.GET_USERS_FAILURE:
        return update(state, { ui: { error: { $set: action.error } } });
    case LOG_OUT:
        return update(state, { ui: { timeoutRef: { $set: action.timeoutRef } } });
    case actionTypes.SHOW_FORGOT_PASSWORD_FOR:
        return update(state, { ui: { showForgotPasswordFor: { $set: action.email } } });
    default:
        return state;
    }
};
