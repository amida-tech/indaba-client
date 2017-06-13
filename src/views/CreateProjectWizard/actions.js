import * as actionTypes from './actionTypes';

export function setWizardProjectTitle(title) {
    return {
        type: actionTypes.SET_WIZARD_PROJECT_TITLE,
        title,
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

export function addUserGroupToWizard(role) {
    return {
        type: actionTypes.ADD_USER_GROUP_TO_WIZARD,
        role,
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

export function addProjectFromWizard(project) {
    return {
        type: actionTypes.ADD_PROJECT_FROM_WIZARD,
        project,
    };
}
