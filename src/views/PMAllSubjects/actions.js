import * as actionTypes from './actionTypes';
import subjectsApi from '../../services/api/subjects';

export const pmAllSubjectsSetQuery = query => ({
    type: actionTypes.PM_ALL_SUBJECTS_SET_QUERY,
    query,
});

export const pmAllSubjectsHideDeleteConfirmModal = () => ({
    type: actionTypes.PM_ALL_SUBJECTS_HIDE_DELETE_CONFIRM_MODAL,
});

export const pmAllSubjectsShowDeleteConfirmModal = (id, confirmType) => ({
    type: actionTypes.PM_ALL_SUBJECTS_SHOW_DELETE_CONFIRM_MODAL,
    id,
    confirmType,
});

export const pmAllSubjectsGetSubjects = () => (dispatch) => {
    dispatch(_getSubjects());
    subjectsApi.getSubjects()
    .then(response => dispatch(_getSubjectsSuccess(response)))
    .catch(err => dispatch(_getSubjectsError(err)));
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

export const pmAllSubjectsOrderByNameAscending = () => ({
    type: actionTypes.PM_ALL_SUBJECTS_ORDER_BY_NAME_ASC,
});

export const pmAllSubjectsOrderByNameDescending = () => ({
    type: actionTypes.PM_ALL_SUBJECTS_ORDER_BY_NAME_DESC,
});

export const pmAllSubjectsDeleteSubject = id => (dispatch) => {
    dispatch(_deleteSubject());
    subjectsApi.deleteSubject(id)
    .then(response => dispatch(_deleteSubjectSuccess(response)))
    .catch(err => dispatch(_deleteSubjectError(err)));
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
