import * as actionTypes from './actionTypes';

export function getWorkflow() {
  return dispatch => dispatch(_getWorkflow());
}

export function updateWorkflowProject() {
  return dispatch => dispatch(_updateWorkflowProject());
}

export function updateWorkflowStatus() {
  return dispatch => dispatch(_updateWorkflowSurvey());
}

export function editSummaryDescription(id) {
  return {
    type: actionTypes.EDIT_SUMMARY_DESCRIPTION,
    id
  };
}

export function subnavigate(id) {
  return {
    type: actionTypes.SUBNAVIGATE,
    id
  };
}

export function showModal(id) {
  return {
    type: actionTypes.SHOW_MODAL,
    id
  };
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  }
}

export function addSubject(subject) {
  return {
    type: actionTypes.ADD_SUBJECT,
    subject
  }
};


function _getWorkflow() {
  return {
    type: actionTypes.GET_WORKFLOW
  };
}

// Split via update successes and failures.
function _updateWorkflowProject(project) {
  return {
    type: actionTypes.UPDATE_WORKFLOW_PROJECT,
    payload: project
  };
}

// Split via update successes and failures.
function _updateWorkflowSurvey(survey) {
  return {
    type: actionTypes.UPDATE_WORKFLOW_SURVEY,
    payload: survey
  };
}
