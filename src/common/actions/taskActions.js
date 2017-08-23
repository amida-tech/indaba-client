import * as actionTypes from '../actionTypes/taskActionTypes';
import apiService from '../../services/api';

export function getTasks(projectId, errorMessages) {
    return (dispatch) => {
        apiService.tasks.getTasks(
            projectId,
            (taskErr, taskResp) => {
                if (!taskErr && taskResp) {
                    dispatch(_getTasksSuccess(taskResp));
                } else {
                    dispatch(_reportTasksError(errorMessages.FETCH_TASKS));
                }
            },
        );
    };
}

export function assignTask(userId, task, projectId) {
    return {
        type: actionTypes.ASSIGN_TASK,
        userId,
        task,
        projectId,
    };
}

export function updateTaskDueDate(taskId, projectId, dueDate) {
    return {
        type: actionTypes.UPDATE_TASK_DUE_DATE,
        taskId,
        projectId,
        dueDate,
    };
}

export function reassignTask(reassignId, taskId, projectId) {
    return {
        type: actionTypes.REASSIGN_TASK,
        reassignId,
        taskId,
        projectId,
    };
}

// Private

function _getTasksSuccess(tasks) {
    return {
        type: actionTypes.GET_TASKS_SUCCESS,
        tasks,
    };
}

function _reportTasksError(error) {
    return {
        type: actionTypes.REPORT_TASKS_ERROR,
        error,
    };
}
