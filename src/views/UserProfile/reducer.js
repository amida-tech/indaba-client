import update from 'immutability-helper';

import * as type from './actionTypes';

export const initialState = {
    ui: {},
    user: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.GET_USER_FOR_PROFILE_SUCCESS:
        return update(state,
            { user: { $set: action.user },
            });
    default:
        return state;
    }
};
