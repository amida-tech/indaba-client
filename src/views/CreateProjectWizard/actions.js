import * as actionTypes from './actionTypes';

export function projectWizardInitialize() {
    return {
        type: actionTypes.PROJECT_WIZARD_INITIALIZE,
    };
}

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
