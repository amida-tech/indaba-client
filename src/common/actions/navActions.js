import cookie from 'react-cookies';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/navActionTypes';

export function showCreateProject(show) {
    return {
        type: actionTypes.SHOW_CREATE_PROJECT,
        show,
    };
}

export function checkProtection(profile) {
    return dispatch => new Promise((resolve) => {
        if (cookie.load('indaba-auth') === undefined) {
            dispatch(push('/login'));
        } else if (get(profile, 'roleID') === 3 || cookie.load('indaba-roleID') === '3') {
            dispatch(push('/task'));
        }
        resolve();
    });
}

export function checkRefresh() {
    return dispatch => new Promise(resolve => apiService.auth.requestRefreshToken(
        cookie.load('indaba-username'),
        cookie.load('indaba-refresh'),
    ).then((refreshResp) => {
        cookie.save('indaba-auth', `Bearer ${refreshResp.token}`, { path: '/' });
        cookie.save('indaba-expire', Date.now() + (refreshResp.ttl * 1000), { path: '/' });
        dispatch(_refreshTokenSuccess());
        return resolve();
    }).catch(() => {
        logOut('');
    }));
}

export function toggleCheckBackend() {
    return {
        type: actionTypes.TOGGLE_CHECK_BACKEND,
    };
}

export function logOut(timeoutRef) {
    cookie.remove('indaba-username', { path: '/' });
    cookie.remove('indaba-auth', { path: '/' });
    cookie.remove('indaba-expire', { path: '/' });
    cookie.remove('indaba-refresh', { path: '/' });
    cookie.remove('indaba-realm', { path: '/' });
    cookie.remove('indaba-roleID', { path: '/' });
    return (dispatch) => {
        dispatch(_logOutSuccess(timeoutRef));
    };
}

function _refreshTokenSuccess() {
    return {
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
    };
}

function _logOutSuccess(timeoutRef) {
    return {
        type: actionTypes.LOG_OUT,
        timeoutRef,
    };
}
