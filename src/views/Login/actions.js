import { push } from 'react-router-redux';
import apiService from '../../services/api';
import * as actionTypes from './actionTypes';

export function login(username, password) {
    return (dispatch) => {
        // dispatch(_loginLoading());
        dispatch(_login());
        const authPayload = {
            username,
            password,
        };
        apiService.auth.login(
        authPayload,
        (err, auth) => {
            if (auth && !err) {
                dispatch(_loginSuccess(auth));
                // dispatch(getUser());
                dispatch(_clearLoginForm());
                dispatch(push('/'));
            } else {
                // dispatch(_loginLoading());
                dispatch(_loginError(err.message));
            // dispatch(_clearLoginForm());
            }
        },
      );
    };
}

// ////////////////
// Private Actions
// ////////////////

function _login() {
    return {
        type: actionTypes.LOGIN,
    };
}

// function _loginLoading() {
//     return {
//         type: actionTypes.LOGIN_LOADING,
//     };
// }

function _loginSuccess(response) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: response,
    };
}

function _clearLoginForm() {
    return {
        type: actionTypes.CLEAR_LOGIN_FORM,
    };
}


function _loginError(response) {
    return {
        type: actionTypes.LOGIN_ERROR,
        payload: response,
    };
}
