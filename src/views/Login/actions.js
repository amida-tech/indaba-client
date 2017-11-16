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
                cookie.save('indaba-auth', (`Bearer ${auth.token}`));
                cookie.save('auth-jwt-token', auth.token);
                cookie.save('indaba-realm', realm);
                dispatch(push('/project'));
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
