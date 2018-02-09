import { uniq } from 'lodash';

import * as actionTypes from './actionTypes';
import apiService from '../../services/api';

export function setSearchQuery(searchQuery) {
    return {
        type: actionTypes.USER_DASH_SET_SEARCH_QUERY,
        searchQuery,
    };
}

export function setFilter(filter) {
    return {
        type: actionTypes.USER_DASH_SET_FILTER,
        filter,
    };
}

export function userDashGetMessages() {
    return (dispatch) => {
        apiService.messaging.list((err, response) => {
            if (err) {
                dispatch(_getMessagesFailure());
            } else {
                dispatch(_getMessagesSuccess(response));
            }
        }, {
            limit: 4,
            received: true,
        });
    };
}

export function getDashboardData(errorMessages, userId) {
    return (dispatch) => {
        (userId !== undefined ?
            apiService.tasks.getTasksByUser.bind(null, userId) :
            apiService.tasks.getSelfTasks
        )(
            (taskErr, taskResp) => {
                if (taskErr) {
                    dispatch(_reportError(errorMessages.FETCH_TASKS));
                } else if (taskResp && taskResp.length > 0) {
                    dispatch(_getTasksSuccess(taskResp));
                    taskResp.forEach(task =>
                        dispatch(_getAnswers(task.assessmentId, errorMessages)));
                    uniq(taskResp.map(task => task.surveyId)).forEach(surveyId =>
                        dispatch(_getSurveyById(surveyId, errorMessages)));
                }
            },
        );
    };
}

function _reportError(message) {
    return {
        type: actionTypes.USER_DASH_REPORT_ERROR,
        message,
    };
}

function _getAnswers(assessmentId, errorMessages) {
    return (dispatch) => {
        apiService.surveys.getAnswers(
            assessmentId,
            (answerErr, answerResp) => {
                if (answerErr) {
                    dispatch(_reportError(errorMessages.ANSWER_REQUEST));
                } else if (answerResp || []) {
                    dispatch(_getAnswersSuccess(answerResp, assessmentId));
                }
            },
        );
    };
}

function _getSurveyById(surveyId, errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveyById(surveyId,
            (surveyErr, surveyResp) => {
                if (surveyErr) {
                    _reportError(errorMessages.SURVEY_REQUEST);
                } else {
                    dispatch(_getSurveyByIdSuccess(surveyResp));
                }
            });
    };
}

function _getTasksSuccess(tasks) {
    return {
        type: actionTypes.USER_DASH_GET_TASKS_SUCCESS,
        tasks,
    };
}

function _getAnswersSuccess(answers, assessmentId) {
    return {
        type: actionTypes.USER_DASH_GET_ANSWERS_SUCCESS,
        answers: Object.assign({}, answers, { assessmentId }),
    };
}

function _getSurveyByIdSuccess(survey) {
    return {
        type: actionTypes.USER_DASH_GET_SURVEY_BY_ID_SUCCESS,
        survey,
    };
}

function _getMessagesFailure(err) {
    return {
        type: actionTypes.USER_DASH_GET_MESSAGES_FAILURE,
        err,
    };
}

function _getMessagesSuccess(messages) {
    return {
        type: actionTypes.USER_DASH_GET_MESSAGES_SUCCESS,
        messages,
    };
}
