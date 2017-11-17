import { postAnswer } from '../../common/actions/surveyActions';
import { getProjectById } from '../../common/actions/projectActions';
import { getTaskById } from '../../common/actions/taskActions';
import * as actionTypes from './actionTypes';

// Survey Form:
export function updateFormSurveyId(surveyId) {
    return {
        type: actionTypes.UPDATE_FORM_SURVEY_ID,
        surveyId,
    };
}

export function getTaskReviewData(projectId, taskId, errorMessages) {
    return (dispatch) => {
        dispatch(getTaskById(projectId, taskId, errorMessages));
        dispatch(getProjectById(projectId, errorMessages));
    };
}

export function upsertAnswer(assessmentId, questionId, answer, required, errorMessages) {
    const requestBody = {
        status: 'new',
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
export function storeFlaggedIssues(flags) {
    return {
        type: actionTypes.STORE_FLAGGED_ISSUES,
        flags,
    };
}

export function showQuestion(questionIndex) {
    return {
        type: actionTypes.SHOW_QUESTION,
        questionIndex,
    };
}

export function collapseAllQuestions() {
    return {
        type: actionTypes.COLLAPSE_ALL_QUESTIONS,
    };
}

export function setActiveFlag(activeId, timestamp) {
    return {
        type: actionTypes.SET_ACTIVE_FLAG,
        activeId,
        timestamp,
    };
}

export function setSignatureId(signatureId) {
    return {
        type: actionTypes.SET_SIGNATURE_ID,
        signatureId,
    };
}

export function updateFlagComment(comment) {
    return {
        type: actionTypes.UPDATE_FLAG_COMMENT,
        comment,
    };
}

export function updateMarkResolved(resolved) {
    return {
        type: actionTypes.UPDATE_MARK_RESOLVED,
        resolved,
    };
}

export function updateNotifyUser(notifyUser) {
    return {
        type: actionTypes.UPDATE_NOTIFY_USER,
        notifyUser,
    };
}

export function cancelFlaggedUpdate() {
    return {
        type: actionTypes.CANCEL_FLAGGED_UPDATE,
    };
}
