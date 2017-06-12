import * as actionTypes from './actionTypes';

export function getWorkflow() {
    return dispatch => dispatch(_getWorkflow());
}

export function updateWorkflowProject() {
    return dispatch => dispatch(_updateWorkflowProject());
}

export function updateWorkflowStatus() {
    return dispatch => dispatch(_updateWorkflowSurvey());
}

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

function _getWorkflow() {
    return {
        type: actionTypes.GET_WORKFLOW,
    };
}

// Split via update successes and failures.
function _updateWorkflowProject(project) {
    return {
        type: actionTypes.UPDATE_WORKFLOW_PROJECT,
        payload: project,
    };
}

// Split via update successes and failures.
function _updateWorkflowSurvey(survey) {
    return {
        type: actionTypes.UPDATE_WORKFLOW_SURVEY,
        payload: survey,
    };
}
