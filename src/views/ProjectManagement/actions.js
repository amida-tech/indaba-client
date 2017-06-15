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

export function setProjectStatus(status, projectId) {
    return {
        type: actionTypes.SET_PROJECT_STATUS,
        status,
        projectId,
    };
}

export function setSurveyStatus(status, projectId) {
    return {
        type: actionTypes.SET_SURVEY_STATUS,
        status,
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

// Task View (declare independence later)
export function updateTaskDueDate(assigneeId, projectId, dueDate) {
    return {
        type: actionTypes.UPDATE_TASK_DUE_DATE,
        assigneeId,
        projectId,
        dueDate,
    };
}

// Task View
export function updateFlaggedQuestion(data) {
    return {
        type: actionTypes.UPDATE_FLAGGED_QUESTION,
        data,
    };
}
