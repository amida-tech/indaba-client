import * as actionTypes from '../actionTypes/surveyActionTypes';
import apiService from '../../services/api';

// API calls.
export function getSurveysList(surveyIds, errorMessages) {
    return (dispatch) => {
        apiService.surveys.getSurveysByIds(
            surveyIds,
            (surveyErr, surveyResp) => {
                dispatch((!surveyErr && surveyResp) ?
                    _getSurveysSuccess(surveyResp) :
                    _reportSurveyError(errorMessages.FETCH_SURVEYS));
            },
        );
    };
}

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

export function addSurveyQuestion() {
    return {
        type: actionTypes.ADD_SURVEY_QUESTION,
    };
}

// Private functions.
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
