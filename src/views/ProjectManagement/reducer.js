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
            task: {},
        },
        userGroupListSearchQuery: '',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.SUBNAVIGATE: // ui related.
        return update(state, { ui: { subnav: { $set: action.id } } });
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
    default:
        return state;
    }
};
