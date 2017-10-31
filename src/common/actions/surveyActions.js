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

export function addSurveyQuestion(surveyId, questionType) { // errorMessages
    // return (dispatch) => {
    //     apiService.surveys.addSurveyQuestion
    // }
    _addSurveyQuestion(surveyId, questionType);
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


function _addSurveyQuestion(surveyId, questionType) {
    return {
        type: actionTypes.ADD_SURVEY_QUESTION,
        surveyId,
        questionType,
    };
}

function _reportSurveyError(error) {
    return {
        type: actionTypes.REPORT_SURVEY_ERROR,
        error,
    };
}
