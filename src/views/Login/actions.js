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
            realm,
        };
        apiService.auth.login(
        authPayload,
        (err, auth) => {
            if (!err && auth) {
                dispatch(_loginSuccess(auth));
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

function _loginSuccess(response) {
    cookie.save('indaba-auth', (`Bearer ${response.token}`));
    cookie.save('indaba-realm', response.realm);
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
