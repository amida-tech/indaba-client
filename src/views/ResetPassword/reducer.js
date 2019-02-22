import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

const initialState = {
    ui: {
        message: '',
        error: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.RESET_PASSWORD_UI_MESSAGE:
        return update(state, {
            ui: {
                message: { $set: action.message },
                error: { $set: action.error || true },
            },
        });
    default:
        return state;
    }
};
