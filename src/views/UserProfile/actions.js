import * as actionTypes from './actionTypes';

import userService from '../../services/api/users';
import projectService from '../../services/api/projects';

export const getAllProfileData = (userId, projectId) => (dispatch) => {
    dispatch(_getAllProfileData());

    dispatch(getUserForProfile(userId));

    if (projectId !== undefined) {
        dispatch(getProjectForProfile(projectId));
    }
};

export const getProjectForProfile = projectId => (dispatch) => {
    dispatch(_getProjectForProfile());
    projectService.getProjectById(projectId, (err, response) => {
        if (!err) {
            dispatch(_getProjectForProfileSuccess(response));
        } else {
            dispatch(_getProjectForProfileError(err));
        }
    });
};

export const getUserForProfile = userId => (dispatch) => {
    dispatch(_getUserForProfile());
    userService.getUser(userId, (err, response) => {
        if (!err) {
            dispatch(_getUserForProfileSuccess(response));
        } else {
            dispatch(_getUserForProfileError(err));
        }
    });
};

const _getAllProfileData = () => ({
    type: actionTypes.GET_ALL_PROFILE_DATA,
});

const _getProjectForProfile = () => ({
    type: actionTypes.GET_PROJECT_FOR_PROFILE,
});

const _getProjectForProfileSuccess = project => ({
    type: actionTypes.GET_PROJECT_FOR_PROFILE_SUCCESS,
    project,
});

const _getProjectForProfileError = err => ({
    type: actionTypes.GET_PROJECT_FOR_PROFILE_ERROR,
    err,
});

const _getUserForProfile = () => ({
    type: actionTypes.GET_USER_FOR_PROFILE,
});

const _getUserForProfileSuccess = user => ({
    type: actionTypes.GET_USER_FOR_PROFILE_SUCCESS,
    user,
});

const _getUserForProfileError = err => ({
    type: actionTypes.GET_USER_FOR_PROFILE_ERROR,
    err,
});
