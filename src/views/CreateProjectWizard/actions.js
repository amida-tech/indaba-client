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

export function createProject(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.projects.postProject(
            requestBody,
            (projErr, projResp) => {
                if (!projErr) {
                    apiService.projects.postProduct({
                        title: requestBody.codeName,
                        description: requestBody.description,
                        projectId: projResp.id,
                        status: 1,
                        originalLangId: 1,
                    },
                    (prodErr, prodResp) => {
                        if (!prodErr) {
                            dispatch(_postProjectSuccess(projResp.id, prodResp.id));
                        } else {
                            dispatch(_postProjectFailure(errorMessages.INSERT_PRODUCT));
                        }
                    });
                } else if (projErr && !projResp) {
                    dispatch(_postProjectFailure(errorMessages.SERVER_ISSUE));
                } else {
                    dispatch(_postProjectFailure(errorMessages.INSERT_PROJECT));
                }
            },
        );
    };
}

export function addSubjectsToWizard(subjects) {
    return {
        type: actionTypes.ADD_SUBJECTS_TO_WIZARD,
        subjects,
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
export function _postProjectSuccess(id, productId) {
    return {
        type: actionTypes.POST_PROJECT_SUCCESS,
        id,
        productId,
    };
}

export function _postProjectFailure(error) {
    return {
        type: actionTypes.POST_PROJECT_FAILURE,
        error,
    };
}
