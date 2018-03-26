import { toast } from 'react-toastify';
import { get } from 'lodash';
import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/userActionTypes';

export function getProfile(errorMessages) {
    return (dispatch) => {
        return apiService.users.getProfile()
        .then((profileResp) => {
            dispatch(getProfileSuccess(profileResp));
            return profileResp;
        }).catch((profileErr) => {
            dispatch(_reportUserError(profileErr, errorMessages.FETCH_PROFILE));
        });
    };
}


export function getProfileSuccess(profile) {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        profile,
    };
}

export function updateProfile(userData, errorMessages) {
    const requestBody = Object.assign({}, userData);
    if (typeof requestBody.notifyLevel !== 'number') {
        requestBody.notifyLevel = get(userData.notifyLevel, 'value', 2);
    }
    if (typeof requestBody.isActive !== 'boolean') {
        requestBody.isActive = userData.isActive.value;
    }

    return (dispatch) => {
        apiService.users.putProfile(
            requestBody,
            (profileErr) => {
                if (profileErr) {
                    dispatch(_reportUserError(profileErr, errorMessages.PROFILE_REQUEST));
                } else {
                    dispatch(getProfile(errorMessages));
                }
            },
        );
    };
}

export function updateProfileById(id, userData, errorMessages) {
    return (dispatch) => {
        dispatch(_updateProfileById());

        apiService.users.putProfileById(id, userData,
        (err, response) => {
            if (err) {
                dispatch(_updateProfileByIdFailure(err, errorMessages.PROFILE_REQUEST));
            } else {
                dispatch(_updateProfileByIdSuccess(response));
                dispatch(getUsers(errorMessages));
            }
        });
    };
}

function _updateProfileById() {
    return {
        type: actionTypes.UPDATE_PROFILE_BY_ID,
    };
}
function _updateProfileByIdFailure(err, errorMessage) {
    return dispatch => dispatch(_reportUserError(err, errorMessage));
}
function _updateProfileByIdSuccess(response) {
    return {
        type: actionTypes.UPDATE_PROFILE_BY_ID_SUCCESS,
        response,
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
                    dispatch(_reportUserError(err, errorMessages.SERVER_ISSUE));
                } else {
                    dispatch(_reportUserError(err, errorMessages.FETCH_USERS));
                }
            },
        );
    };
}

export function addNewUser(userData, projectId, orgId, toastMessages, errorMessages) {
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
        apiService.users.inviteNewUser(
            requestBody,
            (userErr, userResp) => {
                if (!userErr && userResp) {
                    toast(userResp.registered ? toastMessages.EXISTS : toastMessages.INVITED);
                    dispatch(_postNewUserSuccess(userResp, projectId));
                } else if (userErr) {
                    if (userErr.e === 403) {
                        toast(errorMessages.DUPLICATE);
                    }
                    dispatch(_reportUserError(userErr, errorMessages.USER_REQUEST));
                }
            },
        );
    };
}

export function deleteUser(userId, errorMessages) {
    return (dispatch) => {
        dispatch(_deleteUser());
        apiService.users.deleteUser(userId, (err) => {
            if (err) {
                dispatch(_deleteUserError(err, errorMessages.USER_REQUEST));
                dispatch(_reportUserError(err, errorMessages.USER_REQUEST));
            } else {
                dispatch(_deleteUserSuccess(userId));
            }
        });
    };
}

// Private
function _deleteUser() {
    return {
        type: actionTypes.DELETE_USER,
    };
}

function _deleteUserError() {
    return {
        type: actionTypes.DELETE_USER_ERROR,
    };
}

function _deleteUserSuccess(userId) {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        userId,
    };
}

function _getUsersSuccess(users) {
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        users,
    };
}

// err is shorthand for the error response, errorMessage is the display message taken from props.
function _reportUserError(err, errorMessage) {
    return {
        type: actionTypes.REPORT_USER_ERROR,
        err,
        errorMessage,
    };
}

function _postNewUserSuccess(user, projectId) {
    return {
        type: actionTypes.POST_NEW_USER_SUCCESS,
        user,
        projectId,
    };
}
