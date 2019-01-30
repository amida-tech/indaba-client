import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

export const initialState = {
    ui: {},
    tasks: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TASKS_FOR_UPDATE_PW_SUCCESS:
            return update(state, {
                tasks: { $set: action.tasks },
            });
        case actionTypes.LOGIN_SUCCESS:
            return update(state, { ui: { timeoutRef: { $set: '' } } });
        case actionTypes.LOGIN_ERROR:
            return update(state, { ui: { error: { $set: action.error } } });
        case actionTypes.GET_CURRENT_USER_FAILURE:
            return update(state, { ui: { error: { $set: action.error } } });
        default:
            return state;
    }
};