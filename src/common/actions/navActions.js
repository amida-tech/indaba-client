import cookie from 'react-cookies';

import * as actionTypes from '../actionTypes/navActionTypes';


export function showCreateProject(show) {
    return {
        type: actionTypes.SHOW_CREATE_PROJECT,
        show,
    };
}

export function toggleCheckBackend() {
    return {
        type: actionTypes.TOGGLE_CHECK_BACKEND,
    };
}

export function logOut() {
    cookie.remove('indaba-auth', { path: '/*' });
    cookie.remove('auth-jwt-token', { path: '/*' });
    cookie.remove('indaba-realm', { path: '/*' });
    return (dispatch) => {
        dispatch(_logOutSuccess());
    };
}

function _logOutSuccess() {
    return {
        type: actionTypes.LOG_OUT,
    };
}
