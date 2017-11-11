import * as actionTypes from './actionTypes';

export const pmAllUsersShowProfile = userId => ({
    type: actionTypes.PM_ALL_USERS_SHOW_PROFILE,
    userId,
});

export const pmAllUsersSetListQuery = query => ({
    type: actionTypes.PM_ALL_USERS_SET_LIST_QUERY,
    query,
});
