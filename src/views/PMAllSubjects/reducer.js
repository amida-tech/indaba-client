import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
    subjects: [],
    ui: {
        query: '',
        showDeleteConfirmModalForId: null,
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
    case actionTypes.PM_ALL_SUBJECTS_SHOW_DELETE_CONFIRM_MODAL_FOR_ID:
        return update(state, { ui: {
            showDeleteConfirmModalForId: { $set: action.id },
        } });
    default:
        return state;
    }
};
