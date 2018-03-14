import * as actionTypes from './actionTypes';

export const pmAllUsersShowProfile = userId => ({
    type: actionTypes.PM_ALL_USERS_SHOW_PROFILE,
    userId,
});

export const pmAllUsersSetListQuery = query => ({
    type: actionTypes.PM_ALL_USERS_SET_LIST_QUERY,
    query,
});

export const pmAllUsersShowDeleteConfirmModal = (id, promptType) => ({
    type: actionTypes.PM_ALL_USERS_SHOW_DELETE_CONFIRM_MODAL,
    id,
    promptType,
});

export const pmAllUsersHideDeleteConfirmModal = () => ({
    type: actionTypes.PM_ALL_USERS_HIDE_DELETE_CONFIRM_MODAL,
});
