import * as actionTypes from '../actionTypes/surveysActionTypes';

export function setSurveyStatus(status, projectId) {
    return {
        type: actionTypes.SET_SURVEY_STATUS,
        status,
        projectId,
    };
}
