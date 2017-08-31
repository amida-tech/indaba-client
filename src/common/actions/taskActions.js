import * as actionTypes from '../actionTypes/taskActionTypes';
import apiService from '../../services/api';

export function getTasksByProject(projectId, errorMessages) {
    return (dispatch) => {
        apiService.tasks.getTasksByProject(
            projectId,
            (taskErr, taskResp) => {
                if (!taskErr && taskResp) {
                    dispatch(_getTasksByProjectSuccess(projectId, taskResp));
                } else {
                    dispatch(_reportTasksError(errorMessages.FETCH_TASKS));
                }
            },
        );
    };
}

export function getSelfTasks(errorMessages) {
    return (dispatch) => {
        apiService.tasks.getSelfTasks(
            (taskErr, taskResp) => {
                if (!taskErr && taskResp) {
                    dispatch(_getTasksByUserSuccess(null, taskResp));
                } else {
                    dispatch(_reportTasksError(errorMessages.FETCH_TASKS));
                }
            },
        );
    };
}

export function getTasksByUser(userId, errorMessages) {
    return (dispatch) => {
        apiService.tasks.getTasksByUser(
            userId,
            (taskErr, taskResp) => {
                if (!taskErr && taskResp) {
                    dispatch(_getTasksByUserSuccess(userId, taskResp));
                } else {
                    dispatch(_reportTasksError(errorMessages.FETCH_TASKS));
                }
            },
        );
    };
}

export function assignTask(userId, slot, productId, errorMessages) {
    const requestBody = {
        userId,
        stepId: slot.task.stepId,
        uoaId: slot.task.uoaId,
        startDate: slot.stageData.startDate,
        endDate: slot.stageData.endDate,
        isComplete: false,
        productId,
    };

    return (dispatch) => {
        apiService.tasks.postTask(
            requestBody,
            (taskErr, taskResp) => {
                if (!taskErr && taskResp) {
                    dispatch(_postTaskSuccess(userId, slot, taskResp));
                } else {
                    dispatch(_reportTasksError(errorMessages.INSERT_TASK));
                }
            },
        );
    };
}

export function updateTaskEndDate(taskId, projectId, endDate) {
    return {
        type: actionTypes.UPDATE_TASK_DUE_DATE,
        taskId,
        projectId,
        endDate,
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
function _getTasksByProjectSuccess(projectId, tasks) {
    return {
        type: actionTypes.GET_TASKS_BY_PROJECT_SUCCESS,
        projectId,
        tasks,
    };
}

function _getTasksByUserSuccess(userId, tasks) {
    return {
        type: actionTypes.GET_TASKS_BY_USER_SUCCESS,
        userId,
        tasks,
    };
}

function _postTaskSuccess(userId, slot, taskResp) {
    return {
        type: actionTypes.POST_TASK_SUCCESS,
        task: {
            id: taskResp.id,
            userIds: [userId],
            stepId: slot.task.stepId,
            uoaId: slot.task.uoaId,
            endDate: slot.stageData.endDate,
        },
    };
}

function _reportTasksError(error) {
    return {
        type: actionTypes.REPORT_TASKS_ERROR,
        error,
    };
}
