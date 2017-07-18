import * as actionTypes from '../actionTypes/discussActionTypes';

export function updateFlaggedQuestion(taskId, projectId, activeId, data) {
    return {
        type: actionTypes.UPDATE_FLAGGED_QUESTION,
        taskId,
        projectId,
        activeId,
        data,
    };
}

export function forceTaskCompletion(taskId) {
    return {
        type: actionTypes.FORCE_TASK_COMPLETION,
        taskId,
    };
}
