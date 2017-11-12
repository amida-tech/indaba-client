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

export function postSurvey(survey, projectId, productId, errorMessages) {
    const requestBody = {
        authorId: 1,
        name: survey.name,
        status: 'draft',
        sections: [{
            name: `${survey.name} - Part 1`,
            questions: [{
                required: false,
                id: 1,
            }],
        }],
    };
    return (dispatch) => {
        apiService.surveys.postSurvey(
            requestBody,
            (surveyErr, surveyResp) => {
                if (!surveyErr && surveyResp) {
                    const updateBody = {
                        id: productId,
                        surveyId: surveyResp.id,
                    };
                    apiService.projects.putSurveyToProduct(
                        productId,
                        updateBody,
                        (productErr, productResp) => {
                            if (!productErr && productResp) {
                                dispatch(_postSurveySuccess(Object.assign({}, survey, surveyResp)));
                                dispatch(updateProjectWithSurvey(projectId, surveyResp.id));
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

export function patchSurvey(survey, errorMessages) {
    const requestBody = {
        name: survey.name,
        status: survey.status,
        forceStatus: true,
    };
    return (dispatch) => {
        apiService.surveys.patchSurvey(
            survey.id,
            requestBody,
            (surveyErr, surveyResp) => {
                dispatch((!surveyErr && surveyResp.length === 0) ?
                    _patchSurveySuccess(survey.id, requestBody) :
                    _reportSurveyError(errorMessages.FETCH_SURVEYS));
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

// Answer related.
export function postAnswer(requestBody, errorMessages) {
    return (dispatch) => {
        apiService.surveys.postAnswer(
            requestBody,
            (answerErr, answerResp) => {
                console.log('postAnswer');
                console.log(answerResp);
                if (answerErr) {
                    dispatch(_reportSurveyError(errorMessages.ANSWER_REQUEST));
                } else if (answerResp || []) {
                    dispatch(_postAnswerSuccess(requestBody));
                }
            },
        );
    };
}

// UI component related.
export function setSurveyName(name, surveyId) {
    return {
        type: actionTypes.SET_SURVEY_NAME,
        name,
        surveyId,
    };
}

export function setSurveyStatus(status, surveyId) {
    return {
        type: actionTypes.SET_SURVEY_STATUS,
        status,
        surveyId,
    };
}

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

function _postAnswerSuccess(answer) {
    return {
        type: actionTypes.POST_ANSWER_SUCCESS,
        answer,
    };
}

function _reportSurveyError(error) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        error,
    };
}
