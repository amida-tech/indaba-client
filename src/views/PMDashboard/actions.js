import * as actionTypes from './actionTypes';

export function setSearchQuery(searchQuery) {
    return {
        type: actionTypes.PM_DASH_SET_SEARCH_QUERY,
        searchQuery,
    };
}

export function setFilter(filter) {
    return {
        type: actionTypes.PM_DASH_SET_FILTER,
        filter,
    };
}

export function setProjectName(name, projectId) {
    return {
        type: actionTypes.PM_DASH_SET_PROJECT_NAME,
        name,
        projectId,
    };
}

export function setSurveyName(name, surveyId) {
    return {
        type: actionTypes.PM_DASH_SET_SURVEY_NAME,
        name,
        surveyId,
    };
}

export function showNameChange(data) {
    return {
        type: actionTypes.PM_DASH_SHOW_NAME_CHANGE,
        data,
    };
}
