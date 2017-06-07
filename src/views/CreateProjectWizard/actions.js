import * as actionTypes from './actionTypes';

export function setProjectTitle(title) {
    return {
        type: actionTypes.SET_PROJECT_TITLE,
        title,
    };
}

export function addSubjects(subjects) {
    return {
        type: actionTypes.ADD_SUBJECTS,
        subjects,
    };
}

export function deleteSubject(subject) {
    return {
        type: actionTypes.DELETE_SUBJECT,
        subject,
    };
}
