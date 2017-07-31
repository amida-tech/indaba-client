import * as actionTypes from '../actionTypes/navActionTypes';

export function showCreateProject(show) {
    return {
        type: actionTypes.SHOW_CREATE_PROJECT,
        show,
    };
}
