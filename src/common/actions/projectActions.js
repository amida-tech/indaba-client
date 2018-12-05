import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actionTypes from '../actionTypes/projectActionTypes';
import { getSurveys, getSurveyById } from './surveyActions'; // getSurveysList
import { getUsers } from './userActions';
import { getTasksByProduct } from './taskActions';
import Time from '../../utils/Time';
import apiService from '../../services/api';

export function getProjects(errorMessages) {
    return dispatch => apiService.projects.getProjects()
        .then((projectResp) => {
            dispatch(getSurveys(errorMessages));
            dispatch(_getProjectsSuccess(projectResp));
            return projectResp;
        })
        .catch((projectErr) => {
            dispatch(_reportProjectError(projectErr, errorMessages.FETCH_PROJECTS));
            throw projectErr;
        });
}

export function postProject(requestBody, errorMessages) {
    return dispatch => apiService.projects.postProject(requestBody)
        .then((projectResp) => {
            dispatch(_postProjectSuccess(projectResp));
            dispatch(_clearProjectError());
            return projectResp;
        })
        .catch((projectErr) => {
            const displayMessage = get(projectErr, 'body.e') === 403
                ? errorMessages.DUPLICATE_PROJECT_NAME
                : errorMessages.PROJECT_REQUEST;
            dispatch(_reportProjectError(projectErr, displayMessage));
            throw projectErr;
        });
}

export function putProject(project, errorMessages) {
    const { status, name: codeName } = project;

    return dispatch => apiService.projects.putProject(project.id, { status, codeName })
        .then(() => dispatch(getProjectById(project.id, false, errorMessages)))
        .catch((projectErr) => {
            dispatch(_reportProjectError(projectErr, errorMessages.PROJECT_REQUEST));
            throw projectErr;
        });
}

export function getProjectById(projectId, getTasks, errorMessages) {
    return dispatch => apiService.projects.getProjectById(projectId)
        .then((projectResp) => {
            if (projectResp.surveyId) {
                dispatch(getSurveyById(projectResp.surveyId, errorMessages));
            }
            if (getTasks === true) {
                dispatch(getTasksByProduct(projectResp.productId, projectId, errorMessages));
            }
            dispatch(_getProjectByIdSuccess(projectResp));
            return projectResp;
        })
        .catch((projectErr) => {
            dispatch(_reportProjectError(projectErr, errorMessages.FETCH_PROJECTS));
            throw projectErr;
        });
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
        stage,
        {
            workflowId: project.workflowId,
            role: 3,
            startDate: stage.startDate,
            endDate: stage.endDate,
        })];
    if (typeof requestBody[0].endDate === 'object') {
        requestBody[0].endDate.setHours(23, 59, 59, 999);
    }

    return dispatch => apiService.projects.putWorkflowSteps(project.workflowId, requestBody)
        .then((stepResp) => {
            if (!fromWizard && !project.subjects.length) {
                toast(errorMessages.SUBJECT_NEED);
            } else if (fromWizard && project.stages.length >= 3) {
                toast(errorMessages.MAX_STAGES);
            }
            const id = stepResp.inserted[0] ? stepResp.inserted[0] : stepResp.updated[0];
            dispatch(_putStageSuccess(
                Object.assign({}, requestBody[0], { id }), project.id,
            ));
            return stepResp;
        })
        .catch((stepErr) => {
            _reportProjectError(stepErr, errorMessages.STAGE_REQUEST);
            throw stepErr;
        });
}

export function deleteStage(projectId, stageId) {
    return dispatch => apiService.projects.deleteWorkflowStep(stageId)
        .then(() => {
            dispatch(getProjectById(projectId));
        });
}

export function addSubject(project, subjects, fromWizard, errorMessages) {
    const requestBody = {
        subjects,
        unitOfAnalysisType: 1,
        productId: project.productId,
    };

    return dispatch => apiService.projects.postUOA(requestBody)
        .then((uoaResp) => {
            if (!fromWizard && !project.stages.length) {
                toast(errorMessages.STAGE_NEED);
            }
            dispatch(_postSubjectSuccess(uoaResp, project.id));
            return uoaResp;
        })
        .catch((uoaErr) => {
            dispatch(_reportProjectError(uoaErr, errorMessages.SUBJECT_REQUEST));
            throw uoaErr;
        });
}

export function deleteSubject(project, uoaId, fromWizard, errorMessages) {
    const requestBody = {
        productId: project.productId,
        uoaId,
    };

    return dispatch => apiService.projects.deleteUOA(uoaId, requestBody)
        .then((uoaResp) => {
            dispatch(_deleteSubjectSuccess(uoaId, project.id));
            return uoaResp;
        })
        .catch((uoaErr) => {
            dispatch(_reportProjectError(uoaErr, errorMessages.PRODUCT_REQUEST));
            throw uoaErr;
        });
}

export function addUser(userId, projectId, errorMessages) {
    const requestBody = {
        userId,
        projectId,
    };

    return dispatch => apiService.projects.postProjectUsers(projectId, requestBody)
        .then((userResponse) => {
            dispatch(_postProjectUserSuccess(userId, projectId));
            return userResponse;
        })
        .catch((userErr) => {
            dispatch(_reportProjectError(userErr, errorMessages.PRODUCT_REQUEST));
            throw userErr;
        });
}

export function removeUser(userId, projectId, errorMessages) {
    // TODO: Do safety call for tasks assigned to this user.

    return dispatch => apiService.projects.deleteProjectUsers(projectId, userId)
        .then((userResponse) => {
            dispatch(_deleteProjectUserSuccess(userId, projectId));
            return userResponse;
        })
        .catch((userErr) => {
            dispatch(_reportProjectError(userErr, errorMessages.PRODUCT_REQUEST));
            throw userErr;
        });
}

export function addUserGroup(groupData, projectId, organizationId, errorMessages) {
    const requestBody = {
        title: groupData.title,
        organizationId,
        langId: 1,
        users: groupData.users,
        projectId,
    };
    return dispatch => apiService.projects.postGroup(organizationId, requestBody)
        .then((groupResp) => {
            dispatch(getProjectById(projectId, errorMessages));
            dispatch(getUsers(errorMessages));
            return groupResp;
        })
        .catch((groupErr) => {
            dispatch(_reportProjectError(groupErr, errorMessages.GROUP_REQUEST));
            throw groupErr;
        });
}

export function updateUserGroup(groupId, groupData, projectId, organizationId, errorMessages) {
    const { title, users: userId } = groupData;

    return dispatch => apiService.projects.putGroup(groupId, { title, userId, organizationId })
        .then((groupResp) => {
            dispatch(getProjectById(projectId, errorMessages));
            dispatch(getUsers(errorMessages));
            return groupResp;
        })
        .catch((groupErr) => {
            dispatch(_reportProjectError(groupErr, errorMessages.USER_GROUP));
            throw groupErr;
        });
}

export function exportData(productId, projectName, errorMessages) {
    return dispatch => apiService.projects.exportData(productId)
        .then((dataResp) => {
            const blob = new Blob([_stringToBytes(dataResp)], { type: 'application/zip' });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob,
                    `indaba-${projectName}-${Time.renderForExport(new Date())}.zip`);
            } else {
                const a = document.createElement('a');
                a.download = `indaba-${projectName}-${Time.renderForExport(new Date())}.zip`;
                a.href = URL.createObjectURL(blob);
                a.dataset.downloadurl = ['application/zip', a.download, a.href].join(':');
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            return dataResp;
        })
        .catch((dataErr) => {
            dispatch(_reportProjectError(dataErr, errorMessages.DATA_REQUEST));
            throw dataErr;
        });
}

// Modals.
export function showAddSubjectModal(show) {
    return {
        type: actionTypes.SHOW_ADD_SUBJECT_MODAL,
        show,
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

function _clearProjectError() {
    return {
        type: actionTypes.CLEAR_PROJECT_ERROR,
    };
}

// err is shorthand for the error response, errorMessage is the display message taken from props.
function _reportProjectError(err, errorMessage) {
    return {
        type: actionTypes.REPORT_PROJECT_ERROR,
        err,
        errorMessage,
    };
}

function _stringToBytes(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i += 1) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
