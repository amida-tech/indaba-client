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
    console.log(errorMessages.COMING_SOON);
    console.log(survey);
}

// Check on whether these should be private later.
export function setSurveyStatus(status, projectId) {
    return {
        type: actionTypes.SET_SURVEY_STATUS,
        status,
        projectId,
    };
}

export function setSurveyName(name, projectId) {
    return {
        type: actionTypes.SET_SURVEY_NAME,
        name,
        projectId,
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

function _reportSurveyError(error) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        error,
    };
}
