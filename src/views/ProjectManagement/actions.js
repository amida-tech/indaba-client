import * as actionTypes from './actionTypes';
import { deleteStage } from '../../common/actions/projectActions';

export function subnavigate(id) {
    return {
        type: actionTypes.SUBNAVIGATE,
        id,
    };
}

export function pmProjectShowProfile(userId) {
    return {
        type: actionTypes.PM_PROJECT_SHOW_PROFILE,
        userId,
    };
}

export function updateStatusChange(status) {
    return {
        type: actionTypes.UPDATE_STATUS_CHANGE,
        status,
    };
}

export function showInactiveConfirmModal(show) {
    return {
        type: actionTypes.SHOW_INACTIVE_CONFIRM_MODAL,
        show,
    };
}

export function inviteUser(user, projectId) {
    return {
        type: actionTypes.INVITE_USER,
        user,
        projectId,
    };
}

export function updateUserSearchGroup(group) {
    return {
        type: actionTypes.UPDATE_USER_SEARCH_GROUP,
        group,
    };
}

export function updateUserSearchQuery(query) {
    return {
        type: actionTypes.UPDATE_USER_SEARCH_QUERY,
        query,
    };
}

export function updateUserGroupListSearchQuery(query) {
    return {
        type: actionTypes.UPDATE_USER_GROUP_LIST_SEARCH_QUERY,
        query,
    };
}

export function updateUserListSearchQuery(query) {
    return {
        type: actionTypes.UPDATE_USER_LIST_SEARCH_QUERY,
        query,
    };
}

// Task Options Modal:
export function showTaskOptionsModal(task, userGroups) {
    return {
        type: actionTypes.SHOW_TASK_OPTIONS_MODAL,
        task,
        userGroups,
    };
}

export function showStageModal(show, stageId) {
    return {
        type: actionTypes.SHOW_STAGE_MODAL,
        show,
        stageId,
    };
}

export function pmShowStageDeleteConfirmModal(stageId) {
    return {
        type: actionTypes.PM_SHOW_STAGE_DELETE_CONFIRM_MODAL,
        stageId,
    };
}

export function pmHideStageDeleteConfirmModal() {
    return {
        type: actionTypes.PM_HIDE_STAGE_DELETE_CONFIRM_MODAL,
    };
}

export function closeTaskOptionsModal() {
    return {
        type: actionTypes.CLOSE_TASK_OPTIONS_MODAL,
    };
}

export function showSubjectDeleteConfirmModalForId(id) {
    return {
        type: actionTypes.SHOW_SUBJECT_DELETE_CONFIRM_MODAL_FOR_ID,
        id,
    };
}

export function pmShowUserDeleteConfirmModal(id, promptType) {
    return {
        type: actionTypes.PM_SHOW_USER_DELETE_CONFIRM_MODAL,
        id,
        promptType,
    };
}

export function pmHideUserDeleteConfirmModal() {
    return {
        type: actionTypes.PM_HIDE_USER_DELETE_CONFIRM_MODAL,
    };
}

export function startTaskAssign(task) {
    return {
        type: actionTypes.START_TASK_ASSIGN,
        task,
    };
}

export function setAssignTaskQuery(query) {
    return {
        type: actionTypes.SET_ASSIGN_TASK_QUERY,
        query,
    };
}

export function pmShowUserGroupDeleteConfirmModal(id, dataState) {
    return {
        type: actionTypes.PM_SHOW_USER_GROUP_DELETE_CONFIRM_MODAL,
        id,
        dataState,
    };
}

export function pmHideUserGroupDeleteConfirmModal() {
    return {
        type: actionTypes.PM_HIDE_USER_GROUP_DELETE_CONFIRM_MODAL,
    };
}

export function pmShowProjectTitleModal() {
    return {
        type: actionTypes.PM_SHOW_PROJECT_TITLE_MODAL,
    };
}

export function pmHideProjectTitleModal() {
    return {
        type: actionTypes.PM_HIDE_PROJECT_TITLE_MODAL,
    };
}

export function pmShowSurveyTitleModal() {
    return {
        type: actionTypes.PM_SHOW_SURVEY_TITLE_MODAL,
    };
}

export function pmHideSurveyTitleModal() {
    return {
        type: actionTypes.PM_HIDE_SURVEY_TITLE_MODAL,
    };
}

export function pmDeleteStage(projectId, stageId) {
    return dispatch => dispatch(deleteStage(projectId, stageId));
}
