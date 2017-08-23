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
