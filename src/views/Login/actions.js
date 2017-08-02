import { push } from 'react-router-redux';
import cookie from 'react-cookies';

import apiService from '../../services/api';
import * as actionTypes from './actionTypes';
import * as userActions from '../../common/actions/userActions';

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
            if (auth && !err) {
                dispatch(_loginSuccess(auth));
                dispatch(getCurrentUser(errorMessages.FETCH_PROFILE));
                dispatch(getUsers(errorMessages.FETCH_USERS));
                dispatch(push('/project'));
            } else {
                dispatch(_loginError(err.message));
                dispatch(_clearLoginForm());
            }
        },
      );
    };
}

export function getCurrentUser(translatedError) {
    return (dispatch) => {
        apiService.users.getCurrentUser(
      (err, profile) => {
          if (profile && !err) {
              dispatch(userActions.getCurrentUserSuccess(profile));
          } else {
              dispatch(_getCurrentUserFailure(translatedError));
          }
      },
    );
    };
}

export function getUsers(translatedError) {
    return (dispatch) => {
        apiService.users.getUsers(
      (err, users) => {
          if (users && !err) {
              dispatch(userActions.getUsersSuccess(users));
          } else {
              dispatch(_getUsersFailure(translatedError));
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
    cookie.save('indaba-auth', response.token);
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

function _getCurrentUserFailure(error) {
    return {
        type: actionTypes.GET_CURRENT_USER_FAILURE,
        error,
    };
}

function _getUsersFailure(error) {
    return {
        type: actionTypes.GET_USERS_FAILURE,
        error,
    };
}
