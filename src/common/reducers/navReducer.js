import update from 'immutability-helper';

import * as type from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        showCreateProject: false,
        checkBackend: true,
    },
};

export const NavReducer = (state = initialState, action) => {
    switch (action.type) {
    case type.SHOW_CREATE_PROJECT:
        return update(state, { ui: { showCreateProject: { $set: action.show } } });
    case type.TOGGLE_CHECK_BACKEND:
        return update(state, { ui: { checkBackend: { $set: !state.ui.checkBackend } } });
    default:
        return state;
    }
};
