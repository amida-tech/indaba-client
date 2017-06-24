import * as actionTypes from '../actionTypes/tasksActionTypes';

export function assignTask(userId, task, projectId) {
    return {
        type: actionTypes.ASSIGN_TASK,
        userId,
        task,
        projectId,
    };
}

export function updateTask(task, projectId) {
    return {
        type: actionTypes.UPDATE_TASK,
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

// Flag sidebar.
export function updateFlaggedQuestion(data){
    return {
        type: actionTypes.UPDATE_FLAGGED_QUESTION,
        data,
    };
}

export function setTaskOptions() {
    return {
        type: actionTypes.SET_TASK_OPTIONS,
    };
}
