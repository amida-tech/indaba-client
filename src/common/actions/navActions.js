import cookie from 'react-cookies';
import { push } from 'react-router-redux';

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

export function logOut(timeoutRef) {
    cookie.remove('indaba-auth', { path: '/' });
    cookie.remove('indaba-realm', { path: '/' });
    return (dispatch) => {
        dispatch(_logOutSuccess(timeoutRef));
        dispatch(push('/login'));
    };
}

function _logOutSuccess(timeoutRef) {
    return {
        type: actionTypes.LOG_OUT,
        timeoutRef,
    };
}
