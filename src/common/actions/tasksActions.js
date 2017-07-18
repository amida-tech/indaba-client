import * as actionTypes from '../actionTypes/tasksActionTypes';

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
