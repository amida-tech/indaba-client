import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { LOG_OUT } from '../../common/actionTypes/navActionTypes';

const initialState = {
    ui: {
        username: '',
        error: '',
        timeoutRef: '',
        showForgotPassword: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.UPDATE_LOGIN_USERNAME:
        return update(state, { ui: { username: { $set: action.username } } });
    case actionTypes.LOGIN_SUCCESS:
        return update(state, { ui: { timeoutRef: { $set: '' } } });
    case actionTypes.LOGIN_UI_MESSAGE:
        return update(state, { ui: { error: { $set: action.error } } });
    case actionTypes.LOGIN_CLEAR_FORM:
        return update(state, { ui: { showForgotPassword: { $set: false } } });
    case actionTypes.LOGIN_SHOW_FORGOT_PASSWORD:
        return update(state, { ui: { showForgotPassword: { $set: action.show } } });
    case LOG_OUT:
        return update(state, { ui: { timeoutRef: { $set: action.timeoutRef } } });
    default:
        return state;
    }
};
