import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/discussionActionTypes';

export function getDiscussions(taskId, errorMessages) { // errorMessages
    return (dispatch) => {
        apiService.discussions.getDiscussions(
            taskId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _getDiscussionsSuccess(discussResp) :
                    _reportDiscussError(errorMessages.FETCH_DISCUSS));
            },
        );
    };
}

export function postDiscussion(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.discussions.postDiscussion(
            requestBody,
            (discussErr, discussResp) => {
                if (discussErr) {
                    dispatch(_reportDiscussError(errorMessages.FETCH_DISCUSS));
                } else {
                    dispatch(_postDiscussionSuccess(discussResp));
                    dispatch(getDiscussions(requestBody.taskId, errorMessages));
                }
            },
        );
    };
}

export function resolveQuestion(questionId, errorMessages) {
    return (dispatch) => {
        apiService.discussions.markResolved(
            questionId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _putDiscussResolveSuccess(questionId) :
                    _reportDiscussError(errorMessages.FETCH_DISCUSS));
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
function _getDiscussionsSuccess(discussions) {
    return {
        type: actionTypes.GET_DISCUSSIONS_SUCCESS,
        discussions,
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
