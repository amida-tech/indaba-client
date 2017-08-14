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

export function addProjectToWizard(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.postProject(
            requestBody,
            (projErr, projResp) => {
                if (!projErr && projResp) {
                    apiService.projects.postProduct({
                        title: requestBody.codeName,
                        description: requestBody.description,
                        projectId: projResp.id,
                        status: 1,
                        originalLangId: 1,
                    },
                    (prodErr, prodResp) => {
                        dispatch((!prodErr) ?
                            _postProjectWizardSuccess(projResp.id, prodResp.id) :
                            _postProjectWizardFailure(errorMessages.INSERT_PRODUCT));
                    });
                } else if (projErr && !projResp) {
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

export function deleteSubjectFromWizard(subject) {
    return {
        type: actionTypes.DELETE_SUBJECT_FROM_WIZARD,
        subject,
    };
}

export function addUserToWizard(user) {
    return {
        type: actionTypes.ADD_USER_TO_WIZARD,
        user,
    };
}

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

export function addStageToWizard(stage) {
    return {
        type: actionTypes.ADD_STAGE_TO_WIZARD,
        stage,
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
