import * as actionTypes from './actionTypes';

export function subnavigate(id) {
    return {
        type: actionTypes.SUBNAVIGATE,
        id,
    };
}

export function updateStatusChange(status) {
    return {
        type: actionTypes.UPDATE_STATUS_CHANGE,
        status,
    };
}

export function inviteUser(user, projectId) {
    return {
        type: actionTypes.INVITE_USER,
        user,
        projectId,
    };
}

export function updateUserSearchGroup(group) {
    return {
        type: actionTypes.UPDATE_USER_SEARCH_GROUP,
        group,
    };
}

export function updateUserSearchQuery(query) {
    return {
        type: actionTypes.UPDATE_USER_SEARCH_QUERY,
        query,
    };
}

export function updateUserGroupListSearchQuery(query) {
    return {
        type: actionTypes.UPDATE_USER_GROUP_LIST_SEARCH_QUERY,
        query,
    };
}

// Task Options Modal:
export function showTaskOptionsModal(task) {
    return {
        type: actionTypes.SHOW_TASK_OPTIONS_MODAL,
        task,
    };
}

export function closeTaskOptionsModal() {
    return {
        type: actionTypes.CLOSE_TASK_OPTIONS_MODAL,
    };
}

// Add Stage Modal:
export function showAddStageModal() {
    return {
        type: actionTypes.SHOW_ADD_STAGE_MODAL,
    };
}

export function closeAddStageModal() {
    return {
        type: actionTypes.CLOSE_ADD_STAGE_MODAL,
    };
}

// Add Subject Modal:
export function showAddSubjectModal() {
    return {
        type: actionTypes.SHOW_ADD_SUBJECT_MODAL,
    };
}

export function closeAddSubjectModal() {
    return {
        type: actionTypes.CLOSE_ADD_SUBJECT_MODAL,
    };
}
