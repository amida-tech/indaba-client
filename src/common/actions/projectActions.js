import * as actionTypes from '../actionTypes/projectActionTypes';
import apiService from '../../services/api';

// actionCall is an optional dispatch from somewhere else (new project wizard).
// I thought this was a good idea, then I realized that you have to guess what
// the actionCall wants or needs. Fine for now, will probably split later.
export function createSubject(projectId, requestBody, errorMessages, actionCall) {
    return (dispatch) => {
        apiService.projects.postUOA(
            requestBody,
            (uoaErr, uoaResp) => {
                if (!uoaErr && uoaResp) {
                    if (actionCall) {
                        dispatch(actionCall(requestBody.name));
                    } else {
                        dispatch(addSubject(uoaResp, projectId));
                    }
                } else {
                    dispatch(_postSubjectFailure(errorMessages.INSERT_SUBJECT));
                }
            },
        );
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

// To be replaced.
export function addSubject(subject, projectId) {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject,
        projectId,
    };
}

export function deleteSubject(subject, projectId) {
    return {
        type: actionTypes.DELETE_SUBJECT,
        subject,
        projectId,
    };
}

export function addStage(stage, projectId) {
    return {
        type: actionTypes.ADD_STAGE,
        stage,
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

export function addUserGroup(group, projectId) {
    return {
        type: actionTypes.ADD_USER_GROUP,
        group,
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

export function addUser(userId, projectId) {
    return {
        type: actionTypes.ADD_USER,
        userId,
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
export function _postSubjectSuccess(subject, projectId) {
    return {
        type: actionTypes.POST_SUBJECT_SUCCESS,
        subject,
        projectId,
    };
}

export function _postSubjectFailure(error) {
    return {
        type: actionTypes.POST_SUBJECT_FAILURE,
        error,
    };
}
