import * as actionTypes from '../actionTypes/surveyActionTypes';

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
