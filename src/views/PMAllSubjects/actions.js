import * as actionTypes from './actionTypes';
import subjectsApi from '../../services/api/subjects';

export const pmAllSubjectsSetQuery = query => ({
    type: actionTypes.PM_ALL_SUBJECTS_SET_QUERY,
    query,
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
