import * as actionTypes from '../actionTypes/surveyActionTypes';
import apiService from '../../services/api';
import { updateProjectWithSurvey } from './projectActions';

// API calls.
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

 // For creating new survey. For update, use patchSurvey() below.
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

// Check on whether these should be private later.
export function setSurveyStatus(status, surveyId) {
    return {
        type: actionTypes.SET_SURVEY_STATUS,
        status,
        surveyId,
    };
}

export function setSurveyName(name, surveyId) {
    return {
        type: actionTypes.SET_SURVEY_NAME,
        name,
        surveyId,
    };
}

// Private functions.
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

function _getSurveysSuccess(surveys) {
    return {
        type: actionTypes.GET_SURVEYS_SUCCESS,
        surveys,
    };
}

function _reportSurveyError(error) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        error,
    };
}
