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

export function assignTask(assignment) {
  return {
    type: actionTypes.ASSIGN_TASK,
    payload: assignment
  }
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
}

export function addStage(stage) {
  return {
    type: actionTypes.ADD_STAGE,
    stage
  }
}

export function toggleFilter(filter) {
  return {
    type: actionTypes.TOGGLE_FILTER,
    filter
  }
}

export function setProjectStatus(status) {
  return {
    type: actionTypes.SET_PROJECT_STATUS,
    status
  }
}

export function setSurveyStatus(status) {
  return {
    type: actionTypes.SET_SURVEY_STATUS,
    status
  }
}

export function inviteUser(user) {
  return {
    type: actionTypes.INVITE_USER,
    user
  }
}

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
