import { toast } from 'react-toastify';

import * as actionTypes from '../actionTypes/projectActionTypes';
import { getSurveys } from './surveyActions'; // getSurveysList
import apiService from '../../services/api';

// API calls.
export function getProjects(errorMessages) {
    return (dispatch) => {
        apiService.projects.getProjects(
            (projectErr, projectResp) => {
                if (!projectErr && projectResp) {
                    dispatch(getSurveys(errorMessages));
                    dispatch(_getProjectsSuccess(projectResp));
                } else {
                    dispatch(_reportProjectError(errorMessages.FETCH_PROJECTS));
                }
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

export function updateProjectWithSurvey(projectId, surveyId) {
    return {
        type: actionTypes.UPDATE_PROJECT_WITH_SURVEY,
        projectId,
        surveyId,
    };
}

export function putStage(project, stage, fromWizard, errorMessages) {
    const requestBody = [Object.assign({},
        {
            workflowId: project.workflowId,
            position: project.stages.length,
            role: 3,
        },
        stage,
    )];

    return (dispatch) => {
        apiService.projects.putWorkflowSteps(
            project.workflowId,
            requestBody,
            (stepErr, stepResp) => {
                if (!stepErr && stepResp) {
                    if (!fromWizard && !project.subjects.length) {
                        toast(errorMessages.SUBJECT_NEED);
                    }
                    const id = stepResp.inserted[0] ? stepResp.inserted[0] : stepResp.updated[0];
                    dispatch(_putStageSuccess(
                        Object.assign({}, requestBody[0], { id }), project.id));
                } else {
                    _reportProjectError(errorMessages.STAGE_REQUEST);
                }
            },
        );
    };
}

export function addSubject(project, subjects, fromWizard, errorMessages) {
    const requestBody = {
        subjects,
        unitOfAnalysisType: 1,
        productId: project.productId,
    };

    return (dispatch) => {
        apiService.projects.postUOA(
            requestBody,
            (uoaErr, uoaResp) => {
                if (!uoaErr && uoaResp) {
                    if (!fromWizard && !project.stages.length) {
                        toast(errorMessages.STAGE_NEED);
                    }
                    dispatch(_postSubjectSuccess(uoaResp, project.id));
                } else {
                    dispatch(_reportProjectError(errorMessages.SUBJECT_REQUEST));
                }
            },
        );
    };
}

export function deleteSubject(project, uoaId, fromWizard, errorMessages) {
    if (!fromWizard) {
        // TODO: Safety check on tasks.
    }

    const requestBody = {
        productId: project.productId,
        uoaId,
    };

    return (dispatch) => {
        apiService.projects.deleteUOA(
            uoaId,
            requestBody,
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
        userId,
        projectId,
    };

    return (dispatch) => {
        apiService.projects.postProjectUsers(
            projectId,
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
    // TODO: Do safety call for tasks assigned to this user.

    return (dispatch) => {
        apiService.projects.deleteProjectUsers(
            projectId,
            userId,
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
        projectId,
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
export function showStageModal(show, stageId) {
    return {
        type: actionTypes.SHOW_STAGE_MODAL,
        show,
        stageId,
    };
}

export function showAddSubjectModal(show) {
    return {
        type: actionTypes.SHOW_ADD_SUBJECT_MODAL,
        show,
    };
}

export function setProjectName(name, projectId) {
    return {
        type: actionTypes.SET_PROJECT_NAME,
        name,
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

function _postSubjectSuccess(subjects, projectId) {
    return {
        type: actionTypes.POST_SUBJECT_SUCCESS,
        subjects,
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
