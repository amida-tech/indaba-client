import { pickBy, identity } from 'lodash';
import { toast } from 'react-toastify';

import * as actionTypes from '../actionTypes/surveyActionTypes';
import apiService from '../../services/api';
import { updateProjectWithSurvey } from './projectActions';

// Survey API calls.
export function getSurveys(errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveys(
            (surveyErr, surveyResp) => {
                dispatch((!surveyErr && surveyResp) ?
                    _getSurveysSuccess(surveyResp) :
                    _reportSurveyError(errorMessages.FETCH_SURVEYS));
            },
        );
    };
}

export function postSurvey(survey, project, errorMessages) {
    const requestBody = {
        authorId: 1,
        name: survey.name,
        status: 'draft',
    };
    return (dispatch) => {
        apiService.surveys.postSurvey(
            requestBody,
            (surveyErr, surveyResp) => {
                if (!surveyErr && surveyResp) {
                    const updateBody = {
                        id: project.productId,
                        surveyId: surveyResp.id,
                    };
                    apiService.projects.putSurveyToProduct(
                        project.productId,
                        updateBody,
                        (productErr, productResp) => {
                            if (!productErr && productResp) {
                                dispatch(_postSurveySuccess(Object.assign({}, survey, surveyResp)));
                                dispatch(updateProjectWithSurvey(project.id, surveyResp.id));
                            } else {
                                dispatch(_reportSurveyError(errorMessages.SURVEY_REQUEST));
                            }
                        },
                    );
                } else {
                    dispatch(_reportSurveyError(errorMessages.SURVEY_REQUEST));
                }
            },
        );
    };
}

export function patchSurvey(survey, successMessage, errorMessages) {
    const requestBody = pickBy({
        name: survey.name,
        status: survey.status,
        sections: survey.sections,
        forceStatus: true,
    }, identity);

    return (dispatch) => {
        apiService.surveys.patchSurvey(
            survey.id,
            requestBody,
            (surveyErr, surveyResp) => {
                if (!surveyErr && surveyResp.length === 0) {
                    dispatch(_patchSurveySuccess(survey.id, requestBody));
                    toast(successMessage);
                } else {
                    dispatch(_reportSurveyError(errorMessages.FETCH_SURVEYS));
                }
            },
        );
    };
}

export function getSurveyById(surveyId, errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveyById(
            surveyId,
            (surveyErr, surveyResp) => {
                dispatch((!surveyErr && surveyResp) ?
                    _getSurveyByIdSuccess(surveyResp.id, surveyResp) :
                    _reportSurveyError(errorMessages.FETCH_SURVEYS));
            },
        );
    };
}

export function getAssessment(errorMessages) {
    return (dispatch) => {
        apiService.surveys.getAssessment(
            (assessErr, assessResp) => {
                dispatch((!assessErr && assessResp) ?
                    _getAssessmentSuccess(assessResp) :
                    _reportSurveyError(errorMessages.FETCH_ASSESSMENT));
            },
        );
    };
}

export function postAssessment(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.surveys.postAssessment(
            requestBody,
            (assessErr, assessResp) => {
                dispatch((!assessErr && assessResp) ?
                    _postAssessmentSuccess(assessResp) :
                    _reportSurveyError(errorMessages.FETCH_ASSESSMENT));
            },
        );
    };
}

export function getAnswers(assessmentId, errorMessages) {
    return dispatch =>
        apiService.surveys.getAnswers(
            assessmentId,
            (answerErr, answerResp) => {
                if (answerErr) {
                    dispatch(_reportSurveyError(errorMessages.ANSWER_REQUEST));
                } else if (answerResp || []) {
                    dispatch(_getAnswersSuccess(answerResp.answers));
                }
            },
    );
}

// Answer related.
export function postAnswer(assessmentId, requestBody, errorMessages) {
    return (dispatch) => {
        apiService.surveys.postAnswer(
            assessmentId,
            requestBody,
            (answerErr, answerResp) => {
                if (answerErr) {
                    dispatch(_reportSurveyError(errorMessages.ANSWER_REQUEST));
                } else if (answerResp || []) {
                    dispatch(_postAnswerSuccess(requestBody));
                }
            },
        );
    };
}

export function postReview(assessmentId, answers, errorMessages) {
    const requestBody = {
        status: 'in-progress',
        answers,
    };
    return (dispatch) => {
        apiService.surveys.postAnswer(
            assessmentId,
            requestBody,
            (answerErr, answerResp) => {
                if (answerErr) {
                    dispatch(_reportSurveyError(errorMessages.ANSWER_REQUEST));
                } else if (answerResp || []) {
                    dispatch(getAnswers(assessmentId, errorMessages));
                }
            },
        );
    };
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

function _getAssessmentSuccess(assessment) {
    return {
        type: actionTypes.GET_ASSESSMENT_SUCCESS,
        assessment,
    };
}

function _postAssessmentSuccess(assessmentId) {
    return {
        type: actionTypes.POST_ASSESSMENT_SUCCESS,
        assessmentId,
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

function _reportSurveyError(error) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        error,
    };
}
