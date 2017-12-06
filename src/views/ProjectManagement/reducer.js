import update from 'immutability-helper';

import * as type from './actionTypes';

export const initialState = {
    ui: {
        subnav: 'workflow',
        showProfile: false,
        userSidebarSearch: {
            query: '',
            groups: {},
        },
        statusModalId: false,
        taskOptions: {
            show: false,
            task: {},
        },
        userGroupListSearchQuery: '',
        userListSearchQuery: '',
        showSubjectDeleteConfirmModalForId: null,
        showUserDeleteConfirmModal: null,
        assignTaskInput: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.SUBNAVIGATE: // ui related.
        return update(state, { ui: { subnav: { $set: action.id } } });
    case type.PM_PROJECT_SHOW_PROFILE:
        return update(state, { ui: {
            showProfile: { $set: action.userId },
        } });
    case type.UPDATE_STATUS_CHANGE:
        return update(state, { ui: { statusModalId: { $set: action.status } } });
    case type.UPDATE_USER_SEARCH_GROUP:
        return (update(state, { ui: { userSidebarSearch: {
            group: { $set: action.group },
        } } }));
    case type.UPDATE_USER_SEARCH_QUERY:
        return update(state, { ui: { userSidebarSearch: {
            query: { $set: action.query } } } });
    case type.UPDATE_USER_GROUP_LIST_SEARCH_QUERY:
        return update(state, { ui: {
            userGroupListSearchQuery: { $set: action.query } } });
    case type.UPDATE_USER_LIST_SEARCH_QUERY:
        return update(state, { ui: {
            userListSearchQuery: { $set: action.query },
        } });
    case type.SHOW_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: true },
            task: { $set: action.task },
        } } });
    case type.CLOSE_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: false },
            task: { $set: {} },
        } } });
    case type.SHOW_SUBJECT_DELETE_CONFIRM_MODAL_FOR_ID: {
        return update(state, { ui: {
            showSubjectDeleteConfirmModalForId: { $set: action.id },
        } });
    }
    case type.PM_SHOW_USER_DELETE_CONFIRM_MODAL: {
        return update(state, { ui: {
            showUserDeleteConfirmModal: { $set: {
                id: action.id,
                promptType: action.promptType,
            } },
        } });
    }
    case type.PM_HIDE_USER_DELETE_CONFIRM_MODAL: {
        return update(state, { ui: {
            showUserDeleteConfirmModal: { $set: null },
        } });
    }
    case type.START_TASK_ASSIGN:
        return update(state, { ui: {
            assignTaskInput: { $set: action.task },
        } });
    case type.PM_EXPORT_ADD_ALL_SUBJECTS:
        return update(state, { ui: { export: {
            subjects: { $set: action.subjects },
        } } });
    case type.PM_EXPORT_REMOVE_ALL_SUBJECTS:
        return update(state, { ui: { export: {
            subjects: { $set: [] },
        } } });
    case type.PM_EXPORT_REMOVE_SUBJECT:
        return update(state, { ui: { export: {
            subjects: { $apply: subjects =>
                subjects.filter(subject => subject.key !== action.subject.key) },
        } } });
    default:
        return state;
    }
};
