import _ from 'lodash';
import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
    subjects: [],
    ui: {
        query: '',
        showDeleteConfirmModal: null,
    },
    formState: {
        isOrderedByNameAscending: true,
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
            subjects: { $set: subjectsOrderByNameAscending(action.subjects) },
        });
    case actionTypes.PM_ALL_SUBJECTS_ORDER_BY_NAME_ASC:
        return update(state, {
            subjects: { $set: subjectsOrderByNameAscending(state.subjects) },
            formState: {
                isOrderedByNameAscending: { $set: true },
            },
        });
    case actionTypes.PM_ALL_SUBJECTS_ORDER_BY_NAME_DESC:
        return update(state, {
            subjects: { $set: pmAllSubjectsOrderByNameDescending(state.subjects) },
            formState: {
                isOrderedByNameAscending: { $set: false },
            },
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

const subjectsOrderByNameAscending = (subjects) => {
    return _.orderBy(subjects, [subject => subject.name.toLowerCase()], ['asc']);
};

const pmAllSubjectsOrderByNameDescending = (subjects) => {
    return _.orderBy(subjects, [subject => subject.name.toLowerCase()], ['desc']);
};
