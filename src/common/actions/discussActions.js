import * as actionTypes from '../actionTypes/discussActionTypes';

export function updateFlaggedQuestion(taskId, projectId, data) {
    return {
        type: actionTypes.UPDATE_FLAGGED_QUESTION,
        taskId,
        projectId,
        data,
    };
}
