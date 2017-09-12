import * as actionTypes from '../actionTypes/projectActionTypes';
import apiService from '../../services/api';

// API calls.
export function getProjects(errorMessages) {
    return (dispatch) => {
        apiService.projects.getProjects(
            (projectErr, projectResp) => {
                dispatch((!projectErr && projectResp) ?
                    _getProjectsSuccess(projectResp) :
                    _reportProjectError(errorMessages.FETCH_PROJECTS));
            },
        );
    };
}

export function postProject(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.postProject(
            requestBody,
            (projectErr, projectResp) => {
                dispatch((!projectErr && projectResp) ?
                    _postProjectSuccess(projectResp) :
                    _reportProjectError(errorMessages.PROJECT_REQUEST));
            },
        );
    };
}

export function getProjectById(projectId, errorMessages) {
    return (dispatch) => {
        apiService.projects.getProjectById(
            projectId,
            (projErr, projResp) => {
                if (!projErr && projResp) {
                    dispatch(_getProjectByIdSuccess(projResp));
                } else {
                    dispatch(_reportProjectError(errorMessages.FETCH_PROJECTS));
                }
            },
        );
    };
}

export function addStage(project, stage, errorMessages) {
    const requestBody = [Object.assign({},
        {
            workflowId: project.workflowIds[0],
            position: project.stages.length,
            role: 3,
        },
        stage,
    )];

    return (dispatch) => {
        apiService.projects.putWorkflowSteps(
            project.workflowId,
            requestBody,
            (workflowErr, workflowResp) => {
                dispatch((!workflowErr && workflowResp) ?
                    _putStageSuccess(
                        Object.assign({}, requestBody[0], { id: workflowResp.inserted[0] }),
                        project.id) :
                    _reportProjectError(errorMessages.STAGE_REQUEST));
            },
        );
    };
}

export function addSubject(project, name, errorMessages) {
    console.log(project);
    console.log(name);
    if (project.subjects.some(subject => subject.name === name)) {
        return dispatch =>
            dispatch(_reportProjectError(errorMessages.DUPLICATE));
    }

    const requestBody = {
        name,
        unitOfAnalysisType: 1,
    };
    return (dispatch) => {
        apiService.projects.postUOA(
            requestBody,
            (uoaErr, uoaResp) => {
                if (!uoaErr && uoaResp) {
                    apiService.projects.postProductUOA(
                        project.productId,
                        [uoaResp.id],
                        (prodUoaErr, prodUoaResp) => {
                            dispatch((!prodUoaErr && prodUoaResp) ?
                                _postSubjectSuccess({ name, id: uoaResp.id }, project.id) :
                                _reportProjectError(errorMessages.PRODUCT_REQUEST));
                        },
                    );
                } else {
                    dispatch(_reportProjectError(errorMessages.SUBJECT_REQUEST));
                }
            },
        );
    };
}

export function deleteSubject(project, uoaId, fromWizard, errorMessages) {
    if (!fromWizard) {
        // Safety check on tasks.
    }

    return (dispatch) => {
        apiService.projects.deleteUOA(
            project.productId,
            (uoaErr, uoaResp) => {
                dispatch((!uoaErr && uoaResp) ?
                    _deleteSubjectSuccess(uoaId, project.id) :
                    _reportProjectError(errorMessages.PRODUCT_REQUEST));
            },
        );
    };
}

export function addUser(userId, projectId, errorMessages) {
    const requestBody = {

    };

    return (dispatch) => {
        apiService.projects.postProjectUsers(
            requestBody,
            (userErr, userResp) => {
                dispatch((!userErr && userResp) ?
                    _postProjectUserSuccess(userId, projectId) :
                    _reportProjectError(errorMessages.PRODUCT_REQUEST));
            },
        );
    };
}

export function removeUser(userId, projectId, errorMessages) {
    // Do safety call for tasks assigned to this user.

    return (dispatch) => {
        apiService.projects.deleteProjectUsers(
            (userErr, userResp) => {
                dispatch((!userErr && userResp) ?
                    _deleteProjectUserSuccess(userId, projectId) :
                    _reportProjectError(errorMessages.PRODUCT_REQUEST));
            },
        );
    };
}

export function addUserGroup(groupData, projectId, organizationId, errorMessages) {
    const requestBody = {
        title: groupData.title,
        organizationId,
        langId: 1,
        users: groupData.users,
    };
    return (dispatch) => {
        apiService.projects.postGroup(
            organizationId,
            requestBody,
            (groupErr, groupResp) => {
                if (!groupErr && groupResp) {
                    requestBody.id = groupResp.id;
                    dispatch(_postUserGroupSuccess(
                        Object.assign({}, requestBody, groupResp.id),
                        projectId));
                } else {
                    dispatch(_reportProjectError(errorMessages.GROUP_REQUEST));
                }
            },
        );
    };
}

// Modals.
export function showAddStageModal(show) {
    return {
        type: actionTypes.SHOW_ADD_STAGE_MODAL,
        show,
    };
}

export function showAddSubjectModal(show) {
    return {
        type: actionTypes.SHOW_ADD_SUBJECT_MODAL,
        show,
    };
}

export function setProjectStatus(status, projectId) {
    return {
        type: actionTypes.SET_PROJECT_STATUS,
        status,
        projectId,
    };
}

export function editSummaryDescription(id) {
    return {
        type: actionTypes.EDIT_SUMMARY_DESCRIPTION,
        id,
    };
}

export function toggleFilter(filter, projectId) {
    return {
        type: actionTypes.TOGGLE_FILTER,
        filter,
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

export function updateUserGroup(group, projectId) {
    return {
        type: actionTypes.UPDATE_USER_GROUP,
        group,
        projectId,
    };
}

export function setProjectName(name, projectId) {
    return {
        type: actionTypes.SET_PROJECT_NAME,
        name,
        projectId,
    };
}

// Private functions.
function _postProjectSuccess(project) {
    return {
        type: actionTypes.POST_PROJECT_SUCCESS,
        project,
    };
}

function _getProjectsSuccess(projects) {
    return {
        type: actionTypes.GET_PROJECTS_SUCCESS,
        projects,
    };
}

function _getProjectByIdSuccess(project) {
    return {
        type: actionTypes.GET_PROJECT_BY_ID_SUCCESS,
        project,
    };
}

function _putStageSuccess(stage, projectId) {
    return {
        type: actionTypes.PUT_STAGE_SUCCESS,
        stage,
        projectId,
    };
}

function _postSubjectSuccess(subject, projectId) {
    return {
        type: actionTypes.POST_SUBJECT_SUCCESS,
        subject,
        projectId,
    };
}

function _deleteSubjectSuccess(uoaId, projectId) {
    return {
        type: actionTypes.DELETE_SUBJECT_SUCCESS,
        uoaId,
        projectId,
    };
}

function _postProjectUserSuccess(userId, projectId) {
    return {
        type: actionTypes.POST_PROJECT_USER_SUCCESS,
        userId,
        projectId,
    };
}

function _deleteProjectUserSuccess(userId, projectId) {
    return {
        type: actionTypes.DELETE_PROJECT_USER_SUCCESS,
        userId,
        projectId,
    };
}

function _postUserGroupSuccess(group, projectId) {
    return {
        type: actionTypes.ADD_USER_GROUP,
        group,
        projectId,
    };
}

function _reportProjectError(error) {
    return {
        type: actionTypes.REPORT_PROJECT_ERROR,
        error,
    };
}
