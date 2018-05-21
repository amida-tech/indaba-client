import cookie from 'react-cookies';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import * as actionTypes from '../actionTypes/navActionTypes';


export function showCreateProject(show) {
    return {
        type: actionTypes.SHOW_CREATE_PROJECT,
        show,
    };
}

export function checkProtection(profile) {
    return dispatch => new Promise((resolve, reject) => {
        if (cookie.load('indaba-auth') === undefined) {
            dispatch(push('/login'));
            reject();
        } else if (get(profile, 'roleID') === 3 || cookie.load('indaba-roleID') === '3') {
            dispatch(push('/task'));
            reject();
        }
        resolve();
    });
}

export function toggleCheckBackend() {
    return {
        type: actionTypes.TOGGLE_CHECK_BACKEND,
    };
}

export function logOut(timeoutRef) {
    cookie.remove('indaba-auth', { path: '/' });
    cookie.remove('indaba-realm', { path: '/' });
    cookie.remove('indaba-roleID', { path: '/' });
    return (dispatch) => {
        dispatch(_logOutSuccess(timeoutRef));
    };
}

function _logOutSuccess(timeoutRef) {
    return {
        type: actionTypes.LOG_OUT,
        timeoutRef,
    };
}
