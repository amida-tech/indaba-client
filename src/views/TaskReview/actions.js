import * as actionTypes from './actionTypes';

export function storeFlaggedIssues(flags) {
    return {
        type: actionTypes.STORE_FLAGGED_ISSUES,
        flags,
    };
}

export function setActiveFlag(active) {
    return {
        type: actionTypes.SET_ACTIVE_FLAG,
        active,
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

export function updateNotifyUser(notifyUserId) {
    return {
        type: actionTypes.UPDATE_NOTIFY_USER,
        notifyUserId,
    };
}
