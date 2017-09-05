import * as actionTypes from './actionTypes';
import apiService from '../../services/api';

export function updateWizardProjectTitle(title) {
    return {
        type: actionTypes.UPDATE_WIZARD_PROJECT_TITLE,
        title,
    };
}

export function updateWizardProjectSummary(summary) {
    return {
        type: actionTypes.UPDATE_WIZARD_PROJECT_SUMMARY,
        summary,
    };
}

// We add a project then add a product, then a workflow.
export function addProjectToWizard(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.postProject(
            requestBody,
            (projectErr, projectResp) => {
                if (!projectErr && projectResp) {
                    apiService.projects.postProduct({
                        title: requestBody.codeName,
                        description: requestBody.description,
                        projectId: projectResp.id,
                        status: 0,
                        originalLangId: 1,
                    },
                    (productErr, productResp) => {
                        if (!productErr && productResp) {
                            dispatch(_postProjectWizardSuccess(projectResp.id, productResp.id));
                            apiService.projects.postWorkflows({
                                productId: productResp.id,
                                name: requestBody.codeName,
                                description: requestBody.description,
                            },
                            (workflowErr, workflowResp) => {
                                dispatch((!workflowErr) ?
                                    _postWorkflowWizardSuccess(workflowResp.id) :
                                    _postWorkflowWizardFailure(errorMessages.INSERT_WORKFLOW));
                            });
                        } else {
                            dispatch(_postProjectWizardFailure(errorMessages.INSERT_PRODUCT));
                        }
                    });
                } else if (projectErr && !projectResp) {
                    dispatch(_postProjectWizardFailure(errorMessages.SERVER_ISSUE));
                } else {
                    dispatch(_postProjectWizardFailure(errorMessages.INSERT_PROJECT));
                }
            },
        );
    };
}

export function addSubjectsToWizard(productId, requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.postUOA(
            requestBody,
            (uoaErr, uoaResp) => {
                if (!uoaErr && uoaResp) {
                    apiService.projects.postProductUOA(
                        productId,
                        [uoaResp.id],
                        (prodUoaErr, prodUoaResp) => {
                            dispatch((!prodUoaErr && prodUoaResp) ?
                                _postSubjectsWizardSuccess(requestBody.name) :
                                _postSubjectsWizardFailure(errorMessages.CONNECT_PRODUCT));
                        },
                    );
                } else {
                    dispatch(_postSubjectsWizardFailure(errorMessages.INSERT_SUBJECT));
                }
            },
        );
    };
}

export function addUserToWizard(user) {
    return {
        type: actionTypes.POST_USER_WIZARD_SUCCESS,
        user,
    };
}

export function addGroupToWizard(organizationId, groupData, errorMessages) {
    const requestBody = {
        title: groupData.title,
        organizationId,
        users: groupData.users,
    };
    return (dispatch) => {
        apiService.projects.postGroup(
            organizationId,
            requestBody,
            (groupErr, groupResp) => {
                if (!groupErr && groupResp) {
                    requestBody.id = groupResp.id;
                    dispatch(_postGroupsWizardSuccess(requestBody));
                } else {
                    dispatch(_postGroupsWizardFailure(errorMessages.INSERT_GROUP));
                }
            },
        );
    };
}

export function addStageToWizard(workflowIds, requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.putWorkflowSteps(
            workflowIds,
            requestBody,
            (workflowErr, workflowResp) => {
                dispatch((!workflowErr && workflowResp) ?
                    _putStageWizardSuccess(
                        Object.assign({}, requestBody[0], { id: workflowResp.inserted[0] })) :
                    _putStageWizardFailure(errorMessages.INSERT_STAGE));
            },
        );
    };
}

// Show Modals:
export function showAddStageWizardModal(show) {
    return {
        type: actionTypes.SHOW_ADD_STAGE_WIZARD_MODAL,
        show,
    };
}

export function showAddUserGroupWizardModal(show) {
    return {
        type: actionTypes.SHOW_ADD_USER_GROUP_WIZARD_MODAL,
        show,
    };
}

export function deleteSubjectFromWizard(subject) {
    return {
        type: actionTypes.DELETE_SUBJECT_FROM_WIZARD,
        subject,
    };
}

export function removeUserFromWizard(userId) {
    return {
        type: actionTypes.REMOVE_USER_FROM_WIZARD,
        userId,
    };
}

export function removeUserGroupFromWizard(id) {
    return {
        type: actionTypes.REMOVE_USER_GROUP_FROM_WIZARD,
        id,
    };
}

export function addProjectFromWizard(wizard) {
    return {
        type: actionTypes.ADD_PROJECT_FROM_WIZARD,
        wizard,
    };
}

export function goToStep(step) {
    return {
        type: actionTypes.GO_TO_STEP,
        step,
    };
}

export function showCompleteWizard(show) {
    return {
        type: actionTypes.SHOW_COMPLETE_WIZARD,
        show,
    };
}

export function addUsersSetTab(tab) {
    return {
        type: actionTypes.ADD_USERS_SET_TAB,
        tab,
    };
}

export function addUsersSetUsersFilter(filter) {
    return {
        type: actionTypes.ADD_USERS_SET_USERS_FILTER,
        filter,
    };
}

export function addUsersSetGroupsFilter(filter) {
    return {
        type: actionTypes.ADD_USERS_SET_GROUPS_FILTER,
        filter,
    };
}

// Private Functions
function _postProjectWizardSuccess(id, productId) {
    return {
        type: actionTypes.POST_PROJECT_WIZARD_SUCCESS,
        id,
        productId,
    };
}

function _postProjectWizardFailure(error) {
    return {
        type: actionTypes.POST_PROJECT_WIZARD_FAILURE,
        error,
    };
}

function _postSubjectsWizardSuccess(subjects) {
    return {
        type: actionTypes.POST_SUBJECTS_WIZARD_SUCCESS,
        subjects,
    };
}

function _postSubjectsWizardFailure(error) {
    return {
        type: actionTypes.POST_SUBJECTS_WIZARD_FAILURE,
        error,
    };
}

function _postGroupsWizardSuccess(group) {
    return {
        type: actionTypes.POST_GROUP_WIZARD_SUCCESS,
        group,
    };
}

function _postGroupsWizardFailure(error) {
    return {
        type: actionTypes.POST_GROUP_WIZARD_FAILURE,
        error,
    };
}

function _postWorkflowWizardSuccess(workflowIds) {
    return {
        type: actionTypes.POST_WORKFLOW_WIZARD_SUCCESS,
        workflowIds,
    };
}

function _putStageWizardSuccess(stage) {
    return {
        type: actionTypes.PUT_STAGE_WIZARD_SUCCESS,
        stage,
    };
}

function _postWorkflowWizardFailure(error) {
    return {
        type: actionTypes.POST_WORKFLOW_WIZARD_FAILURE,
        error,
    };
}

function _putStageWizardFailure(error) {
    return {
        type: actionTypes.PUT_STAGE_WIZARD_FAILURE,
        error,
    };
}
