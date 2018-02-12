import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import apiService from '../../services/api';
import { getProfileSuccess } from '../../common/actions/userActions';
import * as actionTypes from './actionTypes';

export function login(username, password, realm, referrer, errorMessages) {
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
                apiService.users.getProfile((profileErr, profileResp) => {
                    if (!profileErr && profileResp) {
                        dispatch(getProfileSuccess(profileResp));
                        if (referrer) {
                            dispatch(push(referrer));
                        } else {
                            dispatch(push(profileResp.roleID === 2 ? '/project' : '/task'));
                        }
                    } else {
                        dispatch(_loginError(errorMessages.SERVER_ISSUE));
                    }
                });
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

export function showForgotPasswordFor(email) {
    return {
        type: actionTypes.SHOW_FORGOT_PASSWORD_FOR,
        email,
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
