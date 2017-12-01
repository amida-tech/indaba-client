import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
    subjects: [],
    ui: {
        query: '',
        showDeleteConfirmModal: null,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PM_ALL_SUBJECTS_SET_QUERY:
        return update(state, { ui: {
            query: { $set: action.query },
        } });
    case actionTypes.PM_ALL_SUBJECTS_GET_SUBJECTS_SUCCESS:
        return update(state, {
            subjects: { $set: action.subjects },
        });
    case actionTypes.PM_ALL_SUBJECTS_SHOW_DELETE_CONFIRM_MODAL:
        return update(state, { ui: {
            showDeleteConfirmModal: { $set: { id: action.id, confirmType: action.confirmType } },
        } });
    case actionTypes.PM_ALL_SUBJECTS_HIDE_DELETE_CONFIRM_MODAL:
        return update(state, { ui: {
            showDeleteConfirmModal: { $set: null },
        } });
    default:
        return state;
    }
};
