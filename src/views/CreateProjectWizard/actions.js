import * as actionTypes from './actionTypes';

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

export function setWizardProjectTitle() {
    return {
        type: actionTypes.SET_WIZARD_PROJECT_TITLE,
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
