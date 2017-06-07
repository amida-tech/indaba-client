import * as actionTypes from './actionTypes';

export function setProjectTitle(title) {
    return {
        type: actionTypes.SET_PROJECT_TITLE,
        title,
    };
}

export function addSubject(subject) {
    return {
        type: actionTypes.ADD_SUBJECT,
        subject,
    };
}
