import { push } from 'react-router-redux';
import cookie from 'react-cookie';

import apiService from '../../services/api';
import * as actionTypes from './actionTypes';
import * as userActionTypes from '../../common/actionTypes/userActionTypes';

export function login(username, password, realm) {
    return (dispatch) => {
        // dispatch(_loginLoading());
        dispatch(_login());
        const authPayload = {
            username,
            password,
            realm,
        };
        apiService.auth.login(
        authPayload,
        (err, auth) => {
            if (auth && !err) {
                dispatch(_loginSuccess(auth));
                dispatch(getUser());
                // dispatch(_clearLoginForm());
                dispatch(push('/project'));
            } else {
                // dispatch(_loginLoading());
                dispatch(_loginError(err.message));
                dispatch(_clearLoginForm());
            }
        },
      );
    };
}

export function getUser() {
    return (dispatch) => {
        apiService.users.getCurrentUser(
      (err, user) => {
          if (user && !err) {
              dispatch(_getUserSuccess(user));
          } else {
              dispatch(_getUserFailure());
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
    console.log('JAMES2');
    console.log(cookie);
    cookie.set('indaba-auth', response.token);
    cookie.set('indaba-realm', response.realm);
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

function _getUserSuccess(user) {
    return {
        type: userActionTypes.GET_CURRENT_USER_SUCCESS,
        payload: user,
    };
}

function _getUserFailure() {
    return {
        type: userActionTypes.GET_CURRENT_USER_FAILURE,
    };
}
