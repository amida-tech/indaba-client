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

export function addNewUser(user) {
    return (dispatch) => {
        dispatch(_addNewUser());
        apiService.users.addNewUser(user).then((userData) => {
            dispatch(_addNewUserSuccess(userData));
        });
    };
}

export function updateUser(userId, user) {
    return {
        type: actionTypes.UPDATE_USER,
        userId,
        user,
    };
}

// private
function _addNewUser() {
    return {
        type: actionTypes.ADD_NEW_USER,
    };
}

function _addNewUserSuccess(user) {
    return {
        type: actionTypes.ADD_NEW_USER_SUCCESS,
        user,
    };
}
