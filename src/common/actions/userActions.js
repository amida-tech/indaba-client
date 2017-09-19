import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/userActionTypes';

export function setUserFirstName(userId, firstName) {
    return {
        type: actionTypes.SET_USER_FIRST_NAME,
        userId,
        firstName,
    };
}

export function setUserLastName(userId, lastName) {
    return {
        type: actionTypes.SET_USER_LAST_NAME,
        userId,
        lastName,
    };
}

export function setUserEmail(userId, email) {
    return {
        type: actionTypes.SET_USER_EMAIL,
        userId,
        email,
    };
}

export function setUserTitle(userId, title) {
    return {
        type: actionTypes.SET_USER_TITLE,
        userId,
        title,
    };
}

export function getProfile(errorMessages) {
    return (dispatch) => {
        apiService.users.getProfile(
            (profileErr, profileResp) => {
                dispatch((!profileErr && profileResp) ?
                    _getProfileSuccess(profileResp) :
                    _reportUserError(errorMessages.FETCH_PROFILE));
            },
        );
    };
}

export function updateProfile(requestBody, errorMessages) {
    // const requestBody = (({ id, firstName, lastName, email, notifyLevel, isActive, bio }) =>
    //     ({ id, firstName, lastName, email, notifyLevel, isActive, bio }))(values);
    console.log(requestBody);

    return (dispatch) => {
        apiService.users.putProfile(
            requestBody,
            (profileErr, profileResp) => {
                dispatch((!profileErr && profileResp) ?
                    _putProfileSuccess(profileResp) :
                    _reportUserError(errorMessages.PROFILE_REQUEST));
            },
        );
    };
}

export function resetPassword(errorMessages) {
    // TODO: Coming soon.
    return (dispatch) => {
        dispatch(_reportUserError(errorMessages.COMING_SOON));
    };
}

export function getUsers(errorMessages) {
    return (dispatch) => {
        apiService.users.getUsers(
            (err, users) => {
                if (!err && users) {
                    dispatch(_getUsersSuccess(users));
                } else if (err && !users) {
                    dispatch(_reportUserError(errorMessages.SERVER_ISSUE));
                } else {
                    dispatch(_reportUserError(errorMessages.FETCH_USERS));
                }
            },
        );
    };
}

export function addNewUser(userData, projectId, orgId, errorMessages) {
    const requestBody = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        roleID: 3,
        password: userData.email + Math.floor((Math.random() * 1000000) + 1),
        email: userData.email,
        isActive: false,
        organizationId: orgId,
        notifyLevel: 2,
        projectId,
    };

    return (dispatch) => {
        apiService.users.postNewUser(
            requestBody,
            (userErr, userResp) => {
                dispatch((!userErr && userResp) ?
                    _postNewUserSuccess(userResp, projectId) :
                    _reportUserError(errorMessages.USER_REQUEST));
            },
        );
    };
}

export function updateUser(userId, user) {
    return {
        type: actionTypes.UPDATE_USER,
        userId,
        user,
    };
}

export function notifyUser(userId, message, senderId) {
    return {
        type: actionTypes.NOTIFY_USER,
        userId,
        message,
        senderId,
    };
}

// private
function _getProfileSuccess(profile) {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        profile,
    };
}


function _putProfileSuccess(profile) {
    return {
        type: actionTypes.PUT_PROFILE_SUCCESS,
        profile,
    };
}

function _getUsersSuccess(users) {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users,
    };
}

function _reportUserError(error) {
    return {
        type: actionTypes.REPORT_USER_ERROR,
        error,
    };
}

function _postNewUserSuccess(user, projectId) {
    return {
        type: actionTypes.POST_NEW_USER_SUCCESS,
        user,
        projectId,
    };
}
