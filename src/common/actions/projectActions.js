import * as actionTypes from '../actionTypes/projectActionTypes';
import apiService from '../../services/api';

// API calls.
export function getProjects(errorMessages) {
    return (dispatch) => {
        apiService.projects.getProjects(
            (projErr, projResp) => {
                if (!projErr && projResp) {
                    dispatch(_getProjectsSuccess(projResp));
                } else {
                    dispatch(_reportProjectError(errorMessages.FETCH_PROJECTS));
                }
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
            (workflowErr, workflowResp) => {
                dispatch((!workflowErr && workflowResp) ?
                    _putStageSuccess(
                        project.id,
                        Object.assign({}, requestBody[0], { id: workflowResp.inserted[0] })) :
                    _reportProjectError(errorMessages.STAGE_REQUEST));
            },
        );
    };
}

export function addSubject(project, name, errorMessages) {
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
                                _postSubjectSuccess(project.id, name, prodUoaResp.UOAid) :
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

// export function deleteSubject(projectId, subject, errorMessages) {
//     const requestBody = {
//
//     };
//
//     return (dispatch) => {
//         apiService.projects.deleteProductUOA(
//             requestBody,
//             (uoaErr, uoaResp) => {
//                 if (!uoaErr && uoaResp) {
//                     apiService.projects.deleteUOA(
//                         project.productId,
//                         [uoaResp.id],
//                         (prodUoaErr, prodUoaResp) => {
//                             dispatch((!prodUoaErr && prodUoaResp) ?
//                                 _postSubjectSuccess(project.id, name, prodUoaResp.UOAid) :
//                                 _reportProjectError(errorMessages.PRODUCT_REQUEST));
//                         },
//                     );
//                 } else {
//                     dispatch(_reportProjectError(errorMessages.SUBJECT_REQUEST));
//                 }
//             },
//         );
//     };
// }

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

export function addUser(user, projectId) {
    return {
        type: actionTypes.ADD_USER,
        userId: user.id,
        projectId,
    };
}

export function removeUser(userId, projectId) {
    return {
        type: actionTypes.REMOVE_USER,
        userId,
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

function _putStageSuccess(projectId, stage) {
    return {
        type: actionTypes.PUT_STAGE_SUCCESS,
        projectId,
        stage,
    };
}

function _postSubjectSuccess(projectId, subject) {
    return {
        type: actionTypes.POST_SUBJECT_SUCCESS,
        projectId,
        subject,
    };
}

// function _deleteSubjectSuccess(projectId, subject) {
//     return {
//         type: actionTypes.DELETE_SUBJECT_SUCCESS,
//         projectId,
//         subject,
//     };
// }

export function _postUserGroupSuccess(group, projectId) {
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
