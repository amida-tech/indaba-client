import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import apiService from '../../services/api';
import * as actionTypes from './actionTypes';

export function login(username, password, realm, errorMessages) {
    return (dispatch) => {
        dispatch(_login());

        const authPayload = {
            username,
            password,
        };
        apiService.auth.login(
        authPayload,
        (err, auth) => {
            if (!err && auth) {
                dispatch(_loginSuccess(auth, realm));
                const roleID = cookie.load('roleID');
                if (roleID === 1 || roleID === 2 || roleID === '1' || roleID === '2') {
                    dispatch(push('/project'));
                } else {
                    dispatch(push('/task'));
                }
            } else if (err && !auth) {
                dispatch(_loginError(errorMessages.SERVER_ISSUE));
                dispatch(_clearLoginForm());
            } else {
                dispatch(_loginError(errorMessages.INVALID_LOGIN));
                dispatch(_clearLoginForm());
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

function _loginSuccess(response, realm) {
    cookie.save('indaba-auth', `Bearer ${response.token}`, { path: '/' });
    cookie.save('auth-jwt-token', response.token, { path: '/' });
    cookie.save('indaba-realm', realm, { path: '/' });
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


function _loginError(error) {
    return {
        type: actionTypes.LOGIN_ERROR,
        error,
    };
}
