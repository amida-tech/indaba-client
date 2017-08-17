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
                        status: 1,
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

export function addUserToWizard(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.users.addNewUser(
            requestBody,
            (userErr, userResp) => {
                dispatch((!userErr && userResp) ?
                    _postUserWizardSuccess(userResp) :
                    _postUserWizardFailure(errorMessages.INSERT_USER),
                );
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
                    _putStageWizardSuccess(workflowResp.workflowsIDs) :
                    _putStageWizardFailure(errorMessages.INSERT_STAGE));
            },
        );
    };
}

// Add Stage Modal:
export function showAddStageWizardModal() {
    return {
        type: actionTypes.SHOW_ADD_STAGE_WIZARD_MODAL,
    };
}

export function closeAddStageWizardModal() {
    return {
        type: actionTypes.CLOSE_ADD_STAGE_WIZARD_MODAL,
    };
}

export function deleteSubjectFromWizard(subject) {
    return {
        type: actionTypes.DELETE_SUBJECT_FROM_WIZARD,
        subject,
    };
}

// export function addUserToWizard(user) {
//     return {
//         type: actionTypes.ADD_USER_TO_WIZARD,
//         user,
//     };
// }

export function removeUserFromWizard(userId) {
    return {
        type: actionTypes.REMOVE_USER_FROM_WIZARD,
        userId,
    };
}

export function addUserGroupToWizard(userGroup) {
    return {
        type: actionTypes.ADD_USER_GROUP_TO_WIZARD,
        userGroup,
    };
}

export function removeUserGroupFromWizard(id) {
    return {
        type: actionTypes.REMOVE_USER_GROUP_FROM_WIZARD,
        id,
    };
}

// export function addStageToWizard(stage) {
//     return {
//         type: actionTypes.ADD_STAGE_TO_WIZARD,
//         stage,
//     };
// }

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

export function completeWizard() {
    return {
        type: actionTypes.COMPLETE_WIZARD,
    };
}

export function addUsersSetTab(tab) {
    return {
        type: actionTypes.ADD_USERS_SET_TAB,
        tab,
    };
}

export function addUsersShowSelectGroupUsers(show) {
    return {
        type: actionTypes.ADD_USERS_SHOW_SELECT_GROUP_USERS,
        show,
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
export function _postProjectWizardSuccess(id, productId) {
    return {
        type: actionTypes.POST_PROJECT_WIZARD_SUCCESS,
        id,
        productId,
    };
}

export function _postProjectWizardFailure(error) {
    return {
        type: actionTypes.POST_PROJECT_WIZARD_FAILURE,
        error,
    };
}

export function _postSubjectsWizardSuccess(subjects) {
    return {
        type: actionTypes.POST_SUBJECTS_WIZARD_SUCCESS,
        subjects,
    };
}

export function _postSubjectsWizardFailure(error) {
    return {
        type: actionTypes.POST_SUBJECTS_WIZARD_FAILURE,
        error,
    };
}

export function _postWorkflowWizardSuccess(workflowIds) {
    return {
        type: actionTypes.POST_WORKFLOW_WIZARD_SUCCESS,
        workflowIds,
    };
}

export function _postUserWizardSuccess(userId) {
    return {
        type: actionTypes.POST_USER_WIZARD_SUCCESS,
        userId,
    };
}

export function _postUserWizardFailure(error) {
    return {
        type: actionTypes.POST_USER_WIZARD_FAILURE,
        error,
    };
}

export function _postWorkflowWizardFailure(error) {
    return {
        type: actionTypes.POST_WORKFLOW_WIZARD_FAILURE,
        error,
    };
}

export function _putStageWizardSuccess() {
    return {
        type: actionTypes.PUT_STAGE_WIZARD_SUCCESS,
    };
}

export function _putStageWizardFailure(error) {
    return {
        type: actionTypes.PUT_STAGE_WIZARD_FAILURE,
        error,
    };
}
