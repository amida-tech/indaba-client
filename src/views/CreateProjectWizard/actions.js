import * as actionTypes from './actionTypes';
import { deleteStage } from '../../common/actions/projectActions';

export function projectWizardInitialize() {
    return {
        type: actionTypes.PROJECT_WIZARD_INITIALIZE,
    };
}

export function showAddUserGroupWizardModal(show) {
    return {
        type: actionTypes.SHOW_ADD_USER_GROUP_WIZARD_MODAL,
        show,
    };
}

export function wizardShowSubjectDeleteConfirmModal(id, deleteType) {
    return {
        type: actionTypes.WIZARD_SHOW_SUBJECT_DELETE_CONFIRM_MODAL,
        id,
        deleteType,
    };
}

export function wizardHideSubjectDeleteConfirmModal() {
    return {
        type: actionTypes.WIZARD_HIDE_SUBJECT_DELETE_CONFIRM_MODAL,
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

export function wizardShowStageModal(show, stageId) {
    return {
        type: actionTypes.WIZARD_SHOW_STAGE_MODAL,
        show,
        stageId,
    };
}

export function wizardShowStageDeleteConfirmModal(stageId) {
    return {
        type: actionTypes.WIZARD_SHOW_STAGE_DELETE_CONFIRM_MODAL,
        stageId,
    };
}

export function wizardHideStageDeleteConfirmModal() {
    return {
        type: actionTypes.WIZARD_HIDE_STAGE_DELETE_CONFIRM_MODAL,
    };
}

export function wizardDeleteStage(projectId, stageId) {
    return dispatch => dispatch(deleteStage(projectId, stageId));
}

export function wizardShowProjectTitleModal() {
    return {
        type: actionTypes.WIZARD_SHOW_PROJECT_TITLE_MODAL,
    };
}

export function wizardHideProjectTitleModal() {
    return {
        type: actionTypes.WIZARD_HIDE_PROJECT_TITLE_MODAL,
    };
}

export function wizardShowSurveyTitleModal() {
    return {
        type: actionTypes.WIZARD_SHOW_SURVEY_TITLE_MODAL,
    };
}

export function wizardHideSurveyTitleModal() {
    return {
        type: actionTypes.WIZARD_HIDE_SURVEY_TITLE_MODAL,
    };
}
