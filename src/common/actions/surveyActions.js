import * as actionTypes from '../actionTypes/surveyActionTypes';
import apiService from '../../services/api';

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
export function postSurvey(surveyName, errorMessages) {
    const requestBody = {
        authorId: 1,
        name: surveyName,
        status: 'draft',
        description: '',
        meta: {},
        parentId: 0,
        sections: [],
    };
    return (dispatch) => {
        apiService.surveys.postSurveys(
            requestBody,
            (surveyErr, surveyResp) => {
                dispatch((!surveyErr && surveyResp) ?
                    _postSurveySuccess(surveyResp) :
                    _reportSurveyError(errorMessages.FETCH_SURVEYS));
            },
        );
    };
}

// export function patchSurvey(survey, errorMessages) {
//     Coming soon.
// }

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
