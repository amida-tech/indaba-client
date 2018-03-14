import { pickBy, identity } from 'lodash';
import apiService from '../../services/api';
import { postAnswer } from '../../common/actions/surveyActions';
import * as actionTypes from './actionTypes';

// Survey Form:
export function updateFormSurveyId(surveyId) {
    return {
        type: actionTypes.UPDATE_FORM_SURVEY_ID,
        surveyId,
    };
}

export function holdAnswer(questionId, answer) {
    return {
        type: actionTypes.HOLD_ANSWER,
        questionId,
        answer,
    };
}

export function upsertAnswer(assessmentId, questionId, answer, meta, errorMessages) {
    const requestBody = {
        status: 'in-progress',
        answers: [pickBy({
            questionId,
            answer,
            meta,
        }, identity)],
    };

    return (dispatch) => {
        dispatch(postAnswer(assessmentId, requestBody, errorMessages));
    };
}

// Discussion related:
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

export function updateQuestionDisplay(questionArray) {
    return {
        type: actionTypes.UPDATE_QUESTION_DISPLAY,
        questionArray,
    };
}

export function setActiveFlag(activeId, timestamp) {
    return {
        type: actionTypes.SET_ACTIVE_FLAG,
        activeId,
        timestamp,
    };
}

function _reportDiscussError(error) {
    return {
        type: actionTypes.REPORT_DISCUSS_ERROR,
        error,
    };
}
