import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

export const initialState = {
    ui: {
        showProfile: false,
        listQuery: '',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PM_ALL_USERS_SHOW_PROFILE:
        return update(state, { ui: {
            showProfile: { $set: action.userId },
        } });
    case actionTypes.PM_ALL_USERS_SET_LIST_QUERY:
        return update(state, { ui: {
            listQuery: { $set: action.query },
        } });
    default:
        return state;
    }
};
