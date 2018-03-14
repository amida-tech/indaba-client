import update from 'immutability-helper';

import * as actionTypes from './actionTypes';

export const initialState = {
    ui: {
        showProfile: false,
        listQuery: '',
        showDeleteConfirmModal: null,
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
    case actionTypes.PM_ALL_USERS_SHOW_DELETE_CONFIRM_MODAL:
        return update(state, { ui: {
            showDeleteConfirmModal: { $set: {
                id: action.id,
                promptType: action.promptType,
            } },
        } });
    case actionTypes.PM_ALL_USERS_HIDE_DELETE_CONFIRM_MODAL:
        return update(state, { ui: {
            showDeleteConfirmModal: { $set: null },
        } });
    default:
        return state;
    }
};
