import update from 'immutability-helper';

import * as type from './actionTypes';

export const initialState = {
    ui: {
        subnav: 'workflow',
        userSidebarSearch: {
            query: '',
            groups: {},
        },
        statusModalId: false,
        taskOptions: {
            show: false,
            choice: null,
            notify: true,
            message: '',
            reassignUser: null,
            task: {},
        },
        showAddStage: false,
        showAddSubject: false,
        userGroupListSearchQuery: '',
    },
};

export default (state = initialState, action) => {
    let projectIndex;

    if (action.projectId !== undefined) {
        projectIndex = state.projects.findIndex(project =>
            project.id === action.projectId);
    }

    switch (action.type) {
    case type.SUBNAVIGATE: // ui related.
        return update(state, { ui: { subnav: { $set: action.id } } });
    case type.TOGGLE_FILTER:
        return update(state, { projects: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } } });
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
    case type.UPDATE_TASK_OPTIONS_CHOICE:
        return update(state, { ui: { taskOptions: {
            choice: { $set: action.choice },
        } } });
    case type.UPDATE_TASK_OPTIONS_REASSIGN_USER:
        return update(state, { ui: { taskOptions: {
            reassignUser: { $set: action.reassignUser },
        } } });
    case type.UPDATE_TASK_OPTIONS_NOTIFY:
        return update(state, { ui: { taskOptions: {
            notify: { $set: action.notify },
        } } });
    case type.UPDATE_TASK_OPTIONS_MESSAGE:
        return update(state, { ui: { taskOptions: {
            message: { $set: action.message },
        } } });
    case type.SHOW_ADD_STAGE_MODAL:
        return update(state, { ui: { showAddStage: { $set: true } } });
    case type.CLOSE_ADD_STAGE_MODAL:
        return update(state, { ui: { showAddStage: { $set: false } } });
    case type.SHOW_ADD_SUBJECT_MODAL:
        return update(state, { ui: { showAddSubject: { $set: true } } });
    case type.CLOSE_ADD_SUBJECT_MODAL:
        return update(state, { ui: { showAddSubject: { $set: false } } });
    default:
        return state;
    }
};
