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

export function setTaskOptions(data) {
    console.log(data);
    return {
        type: actionTypes.SET_TASK_OPTIONS,
    };
}
