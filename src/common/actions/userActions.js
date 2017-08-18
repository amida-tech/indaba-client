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

export function addNewUser(requestBody, errorMessage, addedDispatch) {
    return (dispatch) => {
        apiService.users.addNewUser(
            requestBody,
            (userErr, userResp) => {
                if (!userErr && userResp) {
                    dispatch(_addNewUserSuccess(userResp));
                    if (addedDispatch) {
                        addedDispatch(userResp);
                    }
                } else {
                    _reportUserError(errorMessage);
                }
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


export function getCurrentUserSuccess(profile) {
    return {
        type: actionTypes.GET_CURRENT_USER_SUCCESS,
        profile,
    };
}

export function getUsersSuccess(users) {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users,
    };
}

// private

function _addNewUserSuccess(user) {
    return {
        type: actionTypes.ADD_NEW_USER_SUCCESS,
        user,
    };
}

function _reportUserError(error) {
    return {
        type: actionTypes.REPORT_USER_ERROR,
        error,
    };
}
