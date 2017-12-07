import apiService from '../../services/api';
import * as actionTypes from '../actionTypes/discussionActionTypes';

export function getDiscussions(taskId, errorMessages) { // errorMessages
    return (dispatch) => {
        apiService.discuss.getDiscussions(
            taskId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _getDiscussionSuccess(discussResp) :
                    _reportDiscussionError(errorMessages.FETCH_DISCUSS));
            },
        );
    };
}

export function postDiscussions(stuff, errorMessages) {
    const requestBody = { // Order?
        // taskId,
        // questionId,
        // userId,
        // entry,
        // isReturn,
        // isResolve,
        // userFromId,
        // stepId,
    };

    return (dispatch) => {
        apiService.discuss.postDiscussions(
            requestBody,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _postDiscussionSuccess(discussResp) :
                    _reportDiscussionError(errorMessages.FETCH_DISCUSS));
            },
        );
    };
}

export function putResolve(questionId, errorMessages) {
    return (dispatch) => {
        apiService.discuss.putResolve(
            questionId,
            (discussErr, discussResp) => {
                dispatch((!discussErr && discussResp) ?
                    _putResolveSuccess(questionId) :
                    _reportDiscussionError(errorMessages.FETCH_TASKS));
            },
        );
    };
}

// Private functions
function _getDiscussionSuccess(discuss) {
    return {
        type: actionTypes.GET_DISCUSSION_SUCCESS,
        discuss,
    };
}

function _postDiscussionSuccess(discuss) {
    return {
        type: actionTypes.POST_DISCUSSION_SUCCESS,
        discuss,
    };
}

function _putResolveSuccess(questionId) {
    return {
        type: actionTypes.PUT_RESOLVE_SUCCESS,
        questionId,
    };
}

function _reportDiscussionError(error) {
    return {
        type: actionTypes.REPORT_DISCUSS_ERROR,
        error,
    };
}
