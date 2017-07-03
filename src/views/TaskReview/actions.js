import * as actionTypes from './actionTypes';

export function storeFlaggedIssues(flags) {
    return {
        type: actionTypes.STORE_FLAGGED_ISSUES,
        flags,
    };
}

export function setExpandAll(expandAll) {
    return {
        type: actionTypes.SET_EXPAND_ALL,
        expandAll,
    };
}

export function showQuestion(questionIndex) {
    return {
        type: actionTypes.SHOW_QUESTION,
        questionIndex,
    };
}

export function expandAllQuestions() {
    return {
        type: actionTypes.EXPAND_ALL_QUESTIONS,
    };
}

export function collapseAllQuestions() {
    return {
        type: actionTypes.COLLAPSE_ALL_QUESTIONS,
    };
}

export function setActiveFlag(active, timestamp) {
    return {
        type: actionTypes.SET_ACTIVE_FLAG,
        active,
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
