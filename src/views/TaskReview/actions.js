import { postAnswer } from '../../common/actions/surveyActions';
import * as actionTypes from './actionTypes';

// Survey Form:
export function updateFormSurveyId(surveyId) {
    return {
        type: actionTypes.UPDATE_FORM_SURVEY_ID,
        surveyId,
    };
}

export function upsertAnswer(assessmentId, questionId, answer, required, errorMessages) {
    const requestBody = {
        status: 'in-progress',
        answers: [{
            questionId,
            answer,
        }],
    };

    return (dispatch) => {
        dispatch(postAnswer(assessmentId, requestBody, required, errorMessages));
    };
}

// Discussion related:
export function updateQuestionDisplay(questionArray) {
    return {
        type: actionTypes.UPDATE_QUESTION_DISPLAY,
        questionArray,
    };
}

export function setActiveFlag(activeId, timestamp) {
    return {
        type: actionTypes.SET_ACTIVE_FLAG,
        activeId,
        timestamp,
    };
}

export function updateMarkResolved(resolved) {
    return {
        type: actionTypes.UPDATE_MARK_RESOLVED,
        resolved,
    };
}
