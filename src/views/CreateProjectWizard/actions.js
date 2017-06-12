import * as actionTypes from './actionTypes';

export function setProjectTitle(title) {
    return {
        type: actionTypes.SET_PROJECT_TITLE,
        title,
    };
}

export function addSubjects(subjects) {
    return {
        type: actionTypes.ADD_SUBJECTS,
        subjects,
    };
}

export function deleteSubject(subject) {
    return {
        type: actionTypes.DELETE_SUBJECT,
        subject,
    };
}

export function addUserToProject(user) {
    return {
        type: actionTypes.ADD_USER_TO_PROJECT,
        user,
    };
}

export function removeUserFromProject(userId) {
    return {
        type: actionTypes.REMOVE_USER_FROM_PROJECT,
        userId,
    };
}

export function addUserGroup(group) {
    return {
        type: actionTypes.ADD_USER_GROUP,
        group,
    };
}

export function removeUserGroup(id) {
    return {
        type: actionTypes.REMOVE_USER_GROUP,
        id,
    };
}

export function addStage(stage) {
    return {
        type: actionTypes.ADD_STAGE,
        stage,
    };
}
