import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

export const initialState = {
    ui: {
        showProfile: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PM_ALL_USERS_SHOW_PROFILE:
        return update(state, { ui: {
            showProfile: { $set: action.userId },
        } });
    default:
        return state;
    }
};
