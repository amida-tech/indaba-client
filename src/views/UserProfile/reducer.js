import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

export const initialState = {
    ui: {},
    tasks: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.GET_TASKS_FOR_PROFILE_SUCCESS:
        return update(state, {
            tasks: { $set: action.tasks },
        });
    default:
        return state;
    }
};
