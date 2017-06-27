import * as actionTypes from './actionTypes';

export function editSummaryDescription(id) {
    return {
        type: actionTypes.EDIT_SUMMARY_DESCRIPTION,
        id,
    };
}

export function subnavigate(id) {
    return {
        type: actionTypes.SUBNAVIGATE,
        id,
    };
}

export function assignTask(assignment, projectId) {
    return {
        type: actionTypes.ASSIGN_TASK,
        payload: assignment,
        projectId,
    };
}

export function addSubject(subject, projectId) {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject,
        projectId,
    };
}

export function deleteSubject(subject, projectId) {
    return {
        type: actionTypes.DELETE_SUBJECT,
        subject,
        projectId,
    };
}

export function addStage(stage, projectId) {
    return {
        type: actionTypes.ADD_STAGE,
        stage,
        projectId,
    };
}

export function updateTask(task, projectId) {
    return {
        type: actionTypes.UPDATE_TASK,
        task,
        projectId,
    };
}

export function toggleFilter(filter, projectId) {
    return {
        type: actionTypes.TOGGLE_FILTER,
        filter,
        projectId,
    };
}

export function updateStatusChange(status) {
    return {
        type: actionTypes.UPDATE_STATUS_CHANGE,
        status,
    };
}

export function setProjectStatus(status, projectId) {
    return {
        type: actionTypes.SET_PROJECT_STATUS,
        status,
        projectId,
    };
}

export function deleteUserGroup(groupId, projectId) {
    return {
        type: actionTypes.DELETE_USER_GROUP,
        groupId,
        projectId,
    };
}

export function addUserGroup(group, projectId) {
    return {
        type: actionTypes.ADD_USER_GROUP,
        group,
        projectId,
    };
}

export function updateUserGroup(group, projectId) {
    return {
        type: actionTypes.UPDATE_USER_GROUP,
        group,
        projectId,
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

// There has got to be a better way to do this...
export function updateTaskOptionsChoice(choice) {
    return {
        type: actionTypes.UPDATE_TASK_OPTIONS_CHOICE,
        choice,
    };
}

export function updateTaskOptionsReassignId(reassignId) {
    return {
        type: actionTypes.UPDATE_TASK_OPTIONS_REASSIGN_ID,
        reassignId,
    };
}

export function updateTaskOptionsNotify(notify) {
    return {
        type: actionTypes.UPDATE_TASK_OPTIONS_NOTIFY,
        notify,
    };
}

export function updateTaskOptionsMessage(message) {
    return {
        type: actionTypes.UPDATE_TASK_OPTIONS_MESSAGE,
        message,
    };
}

export function setTaskOptions() {
    return {
        type: actionTypes.SET_TASK_OPTIONS,
    };
}
