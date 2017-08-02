import update from 'immutability-helper';

import * as type from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        showCreateProject: false,
    },
};

export const NavReducer = (state = initialState, action) => {
    switch (action.type) {
    case type.SHOW_CREATE_PROJECT:
        return update(state, { ui: { showCreateProject: { $set: action.show } } });
    default:
        return state;
    }
};
