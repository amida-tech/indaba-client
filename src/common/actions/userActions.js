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
          (err, profile) => {
              if (profile && !err) {
                  dispatch(_getProfileSuccess(profile));
              } else {
                  dispatch(_reportUserError(errorMessages.FETCH_PROFILE));
              }
          },
        );
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

export function addNewUser(requestBody, errorMessage, addedDispatch) {
    return (dispatch) => {
        apiService.users.postNewUser(
            requestBody,
            (userErr, userResp) => {
                if (!userErr && userResp) {
                    dispatch(_postNewUserSuccess(userResp));
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

// private
function _getProfileSuccess(profile) {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
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

function _postNewUserSuccess(user) {
    return {
        type: actionTypes.POST_NEW_USER_SUCCESS,
        user,
    };
}
