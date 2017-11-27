import * as actionTypes from './actionTypes';
import subjectsApi from '../../services/api/subjects';

export const pmAllSubjectsSetQuery = query => ({
    type: actionTypes.PM_ALL_SUBJECTS_SET_QUERY,
    query,
});

export const pmAllSubjectsShowDeleteConfirmModalForId = id => ({
    type: actionTypes.PM_ALL_SUBJECTS_SHOW_DELETE_CONFIRM_MODAL_FOR_ID,
    id,
});

export const pmAllSubjectsGetSubjects = () => (dispatch) => {
    dispatch(_getSubjects());
    subjectsApi.getSubjects((err, response) => {
        if (err) {
            dispatch(_getSubjectsError(err));
        } else {
            dispatch(_getSubjectsSuccess(response));
        }
    });
};

const _getSubjects = () => ({
    type: actionTypes.PM_ALL_SUBJECTS_GET_SUBJECTS,
});

const _getSubjectsError = err => ({
    type: actionTypes.PM_ALL_SUBJECTS_GET_SUBJECTS_ERROR,
    err,
});

const _getSubjectsSuccess = subjects => ({
    type: actionTypes.PM_ALL_SUBJECTS_GET_SUBJECTS_SUCCESS,
    subjects,
});

export const pmAllSubjectsDeleteSubject = id => (dispatch) => {
    dispatch(_deleteSubject());
    subjectsApi.deleteSubject(id, (err, response) => {
        if (err) {
            dispatch(_deleteSubjectError(err));
        } else {
            dispatch(_deleteSubjectSuccess(response));
        }
    });
};

const _deleteSubject = () => ({
    type: actionTypes.PM_ALL_SUBJECTS_DELETE_SUBJECT,
});

const _deleteSubjectError = err => ({
    type: actionTypes.PM_ALL_SUBJECTS_DELETE_SUBJECT_ERROR,
    err,
});

const _deleteSubjectSuccess = subject => ({
    type: actionTypes.PM_ALL_SUBJECTS_DELETE_SUBJECT_SUCCESS,
    subject,
});
