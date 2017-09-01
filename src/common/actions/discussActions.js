import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/discussActionTypes';

export function getDiscuss(taskId, errorMessages) { // errorMessages
    return (dispatch) => {
        apiService.discuss.getDiscuss(
            taskId,
            (discussErr, discussResp) => {
                if (!discussErr && discussResp) {
                    dispatch(_getDiscussSuccess(discussResp));
                } else {
                    dispatch(_reportDiscussError(errorMessages.FETCH_TASKS));
                }
            },
        );
    };
}

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

// Private functions
function _getDiscussSuccess(discuss) {
    return {
        type: actionTypes.GET_DISCUSS_SUCCESS,
        discuss,
    };
}

function _reportDiscussError(error) {
    return {
        type: actionTypes.REPORT_DISCUSS_ERROR,
        error,
    };
}
