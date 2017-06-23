import * as actionTypes from './actionTypes';

export function updateTaskDueDate(assigneeId, projectId, dueDate) {
    return {
        type: actionTypes.UPDATE_TASK_DUE_DATE,
        assigneeId,
        projectId,
        dueDate,
    };
}

export function updateFlaggedQuestion(data) {
    return {
        type: actionTypes.UPDATE_FLAGGED_QUESTION,
        data,
    };
}
