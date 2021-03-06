import { pickBy, identity } from 'lodash';
import { toast } from 'react-toastify';

import * as actionTypes from '../actionTypes/surveyActionTypes';
import apiService from '../../services/api';
import { updateProjectWithSurvey } from './projectActions';

// Survey API calls.
export function getSurveys(errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveys()
            .then((surveyResp) => {
                dispatch(_getSurveysSuccess(surveyResp));
                return surveyResp;
            })
            .catch((surveyErr) => {
                dispatch(_reportSurveyError(surveyErr, errorMessages.FETCH_SURVEYS));
                throw surveyErr;
            });
    };
}

export function postSurvey(survey, project, errorMessages) {
    const requestBody = {
        authorId: 1,
        name: survey.name,
        status: 'draft',
    };
    return (dispatch) => {
        apiService.surveys.postSurvey(requestBody)
            .then((surveyResp) => {
                const updateBody = {
                    id: project.productId,
                    surveyId: surveyResp.id,
                };
                return apiService.projects.putSurveyToProduct(project.productId, updateBody)
                    .then(() => {
                        dispatch(_postSurveySuccess(Object.assign({}, survey, surveyResp)));
                        dispatch(updateProjectWithSurvey(project.id, surveyResp.id));
                    });
            })
            .catch((surveyErr) => {
                dispatch(_reportSurveyError(surveyErr, errorMessages.SURVEY_REQUEST));
                throw surveyErr;
            });
    };
}

export function patchSurvey(survey, successMessage, errorMessages) {
    const requestBody = pickBy({
        name: survey.name,
        status: survey.status,
        sections: survey.sections,
        description: survey.description,
        forceStatus: true,
    }, identity);

    return (dispatch) => {
        apiService.surveys.patchSurvey(survey.id, requestBody)
            .then((surveyResp) => {
                dispatch(_patchSurveySuccess(survey.id, requestBody));
                toast(successMessage);
                apiService.projects.editSurvey(survey.id);
                return surveyResp;
            })
            .catch((surveyErr) => {
                dispatch(_reportSurveyError(surveyErr, errorMessages.FETCH_SURVEYS));
                throw surveyErr;
            });
    };
}

export function getSurveyById(surveyId, errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveyById(surveyId)
            .then((surveyResp) => {
                dispatch(_getSurveyByIdSuccess(surveyResp.id, surveyResp));
                return surveyResp;
            })
            .catch((surveyErr) => {
                dispatch(_reportSurveyError(surveyErr, errorMessages.FETCH_SURVEYS));
                throw surveyErr;
            });
    };
}

export function completeAssessment(assessmentId, errorMessages) {
    const requestBody = {
        status: 'completed',
        answers: [],
    };

    return dispatch => apiService.surveys.postAnswer(assessmentId, requestBody)
        .catch((assessErr) => {
            dispatch(_reportSurveyError(assessErr, errorMessages.ANSWER_REQUEST));
            throw assessErr;
        });
}

export function getAnswers(assessmentId, errorMessages) {
    return dispatch => apiService.surveys.getAnswers(assessmentId)
        .then((answerResp) => {
            dispatch(_getAnswersSuccess(answerResp.answers));
            return answerResp;
        })
        .catch((answerErr) => {
            dispatch(_reportSurveyError(answerErr, errorMessages.ANSWER_REQUEST));
            throw answerErr;
        });
}

// Answer related.
export function postAnswer(assessmentId, requestBody, errorMessages) {
    return dispatch => apiService.surveys.postAnswer(assessmentId, requestBody)
        .then((answerResp) => {
            dispatch(_postAnswerSuccess(requestBody));
            return answerResp;
        })
        .catch((answerErr) => {
            dispatch(_reportSurveyError(answerErr, errorMessages.ANSWER_REQUEST));
            throw answerErr;
        });
}

export function postReview(assessmentId, answers, errorMessages) {
    const requestBody = {
        status: 'in-progress',
        answers,
    };
    return dispatch => apiService.surveys.postAnswer(assessmentId, requestBody)
        .then((answerResp) => {
            dispatch(getAnswers(assessmentId, errorMessages));
            return answerResp;
        })
        .catch((answerErr) => {
            dispatch(_reportSurveyError(answerErr, errorMessages.ANSWER_REQUEST));
            throw answerErr;
        });
}

// UI component related.
export function setSurveySectionIndex(index) {
    return {
        type: actionTypes.SET_SURVEY_SECTION_INDEX,
        index,
    };
}

// Private functions.
function _getSurveysSuccess(surveys) {
    return {
        type: actionTypes.GET_SURVEYS_SUCCESS,
        surveys,
    };
}

function _postSurveySuccess(survey) {
    return {
        type: actionTypes.POST_SURVEY_SUCCESS,
        survey,
    };
}

function _patchSurveySuccess(surveyId, survey) {
    return {
        type: actionTypes.PATCH_SURVEY_SUCCESS,
        surveyId,
        survey,
    };
}

function _getSurveyByIdSuccess(surveyId, survey) {
    return {
        type: actionTypes.GET_SURVEY_BY_ID_SUCCESS,
        surveyId,
        survey,
    };
}

function _getAnswersSuccess(answers) {
    return {
        type: actionTypes.GET_ANSWERS_SUCCESS,
        answers,
    };
}

function _postAnswerSuccess(response) {
    return {
        type: actionTypes.POST_ANSWER_SUCCESS,
        questionId: response.answers[0].questionId,
        answer: response.answers[0].answer,
        meta: response.answers[0].meta,
    };
}

// err is shorthand for the error response, errorMessage is the display message taken from props.
function _reportSurveyError(err, errorMessage) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        err,
        errorMessage,
    };
}
