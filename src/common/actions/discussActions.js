import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/discussActionTypes';

export function getDiscuss(taskId, errorMessages) { // errorMessages
    return (dispatch) => {
        apiService.discuss.getDiscuss(
            taskId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _getDiscussSuccess(discussResp) :
                    _reportDiscussError(errorMessages.FETCH_DISCUSS));
            },
        );
    };
}

export function postDiscussion(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.discuss.postDiscussion(
            requestBody,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _postDiscussionSuccess(discussResp) :
                    _reportDiscussError(errorMessages.FETCH_DISCUSS));
            },
        );
    };
}

export function resolveQuestion(questionId, errorMessages) {
    return (dispatch) => {
        apiService.discuss.markResolved(
            questionId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _putDiscussResolveSuccess(questionId) :
                    _reportDiscussError(errorMessages.FETCH_TASKS));
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

// Private functions
function _getDiscussSuccess(discuss) {
    return {
        type: actionTypes.GET_DISCUSS_SUCCESS,
        discuss,
    };
}

function _postDiscussionSuccess(discussion) {
    return {
        type: actionTypes.POST_DISCUSSION_SUCCESS,
        discussion,
    };
}

function _putDiscussResolveSuccess(questionId) {
    return {
        type: actionTypes.PUT_DISCUSS_RESOLVE_SUCCESS,
        questionId,
    };
}

function _reportDiscussError(error) {
    return {
        type: actionTypes.REPORT_DISCUSS_ERROR,
        error,
    };
}
