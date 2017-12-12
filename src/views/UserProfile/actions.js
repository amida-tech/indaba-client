import * as actionTypes from './actionTypes';
import * as userActions from '../../common/actions/userActions';
import * as projectActions from '../../common/actions/projectActions';

import taskService from '../../services/api/tasks';

export const getAllProfileData = (userId, projectId, errorMessages) => (dispatch) => {
    dispatch(_getAllProfileData());

    dispatch(userActions.getUsers(errorMessages));

    if (projectId !== undefined) {
        dispatch(projectActions.getProjectById(projectId, false, errorMessages));
    }

    dispatch(getTasksForProfile(userId));
};

export const getTasksForProfile = userId => (dispatch) => {
    dispatch(_getTasksForProfile());

    taskService.getTasksByUser(userId, (err, response) => {
        if (err) {
            dispatch(_getTasksForProfileFailure(err));
        } else {
            dispatch(_getTasksForProfileSuccess(response));
        }
    });
};

const _getAllProfileData = () => ({
    type: actionTypes.GET_ALL_PROFILE_DATA,
});

const _getTasksForProfile = () => ({
    type: actionTypes.GET_TASKS_FOR_PROFILE,
});

const _getTasksForProfileFailure = err => ({
    type: actionTypes.GET_TASKS_FOR_PROFILE_FAILURE,
    err,
});

const _getTasksForProfileSuccess = tasks => ({
    type: actionTypes.GET_TASKS_FOR_PROFILE_SUCCESS,
    tasks,
});
