import { toast } from 'react-toastify';
import { pickBy, identity } from 'lodash';
import { push } from 'react-router-redux';

import { getAnswers } from '../actions/surveyActions';
import { getProjectById } from '../actions/projectActions';
import * as actionTypes from '../actionTypes/taskActionTypes';
import apiService from '../../services/api';

export function getTasksByProduct(productId, projectId, errorMessages) {
    return (dispatch) => {
        apiService.tasks.getTasksByProduct(productId)
        .then((taskResp) => {
            dispatch(_getTasksByProductSuccess(projectId, taskResp));
            return taskResp;
        })
        .catch((taskErr) => {
            dispatch(_reportTasksError(taskErr, errorMessages.FETCH_TASKS));
        });
    };
}

export function getTaskById(projectId, taskId, errorMessages) {
    return dispatch =>
    apiService.tasks.getTaskById(taskId)
    .then((taskResp) => {
        dispatch(getAnswers(taskResp.assessmentId, errorMessages));
        dispatch(getProjectById(projectId, false, errorMessages));
        dispatch(_getTaskByIdSuccess(projectId, taskResp));
    })
    .catch((taskErr) => {
        dispatch(_reportTasksError(taskErr, errorMessages.FETCH_TASKS));
    });
}

export function getSelfTasks(errorMessages) {
    return dispatch =>
    apiService.tasks.getSelfTasks()
    .then(taskResp => dispatch(_getTasksByUserSuccess(taskResp[0].userIds[0], taskResp)))
    .catch(taskErr => dispatch(_reportTasksError(taskErr, errorMessages.FETCH_TASKS)));
}


export function getTasksByUser(userId, errorMessages) {
    return dispatch =>
    apiService.tasks.getTasksByUser(userId)
    .then(taskResp => dispatch(_getTasksByUserSuccess(userId, taskResp)))
    .catch(taskErr => dispatch(_reportTasksError(taskErr, errorMessages.FETCH_TASKS)));
}

export function assignTask(userId, slot, project, errorMessages) {
    if (project.surveyId < 0 || !project.surveyId) {
        toast(errorMessages.CREATE_SURVEY);
        return (dispatch) => {
            dispatch(_reportTasksError(null, errorMessages.ASSESSMENT_REQUEST));
        };
    }

    const surveyRequestBody = {
        name: slot.stageData.title,
        stage: slot.stageData.id,
        surveys: [{
            id: project.surveyId,
        }],
        group: `${project.productId}-${slot.task.uoaId}`,
    };

    const requestBody = {
        userId,
        title: slot.stageData.title,
        stepId: slot.stageData.id,
        uoaId: slot.task.uoaId,
        startDate: slot.stageData.startDate,
        endDate: slot.stageData.endDate,
        isComplete: false,
        productId: project.productId,
    };

    return (dispatch) => {
        apiService.surveys.postAssessment(surveyRequestBody)
        .then((assessmentResp) => {
            requestBody.assessmentId = assessmentResp.id;
            apiService.tasks.postTask(requestBody)
            .then(taskResp => dispatch(_postTaskSuccess(taskResp)))
            .catch(taskErr => dispatch(_reportTasksError(taskErr, errorMessages.TASK_REQUEST)));
        })
        .catch((assessmentErr) => {
            dispatch(_reportTasksError(assessmentErr, errorMessages.ASSESSMENT_REQUEST));
        });
    };
}

export function moveTask(productId, uoaId, errorMessages) {
    return dispatch => apiService.tasks.moveTask(productId, uoaId)
    .then(() => dispatch(push('/task')))
    .catch((workflowErr) => {
        dispatch(_reportTasksError(workflowErr, errorMessages.TASK_REQUEST));
        throw workflowErr;
    });
}

export function forceTaskCompletion(productId, uoaId, errorMessages) {
    return (dispatch) => {
        return apiService.tasks.forceMoveTask(productId, uoaId)
        .catch((workflowErr) => {
            dispatch(_reportTasksError(workflowErr, errorMessages.TASK_REQUEST));
        });
    };
}

export function updateTaskEndDate(taskId, projectId, endDate) {
    return {
        type: actionTypes.UPDATE_TASK_DUE_DATE,
        taskId,
        projectId,
        endDate,
    };
}

export function updateTask(taskId, userIds, endDate, errorMessages) {
    const requestBody = pickBy({
        userIds,
        endDate,
    }, identity);

    if (requestBody.endDate !== undefined) {
        requestBody.endDate.setHours(23, 59, 59, 999);
    }

    return (dispatch) => {
        apiService.tasks.putTask(taskId, requestBody)
        .then(() => dispatch(_putTaskSuccess(taskId, requestBody)))
        .catch(taskErr => dispatch(_reportTasksError(taskErr, errorMessages.TASK_REQUEST)));
    };
}

// Private
function _getTasksByProductSuccess(projectId, tasks) {
    return {
        type: actionTypes.GET_TASKS_BY_PRODUCT_SUCCESS,
        projectId,
        tasks,
    };
}

function _getTaskByIdSuccess(projectId, task) {
    return {
        type: actionTypes.GET_TASK_BY_ID_SUCCESS,
        projectId,
        task,
    };
}

function _getTasksByUserSuccess(userId, tasks) {
    return {
        type: actionTypes.GET_TASKS_BY_USER_SUCCESS,
        userId,
        tasks,
    };
}

function _postTaskSuccess(taskResp) {
    return {
        type: actionTypes.POST_TASK_SUCCESS,
        task: taskResp,
    };
}

function _putTaskSuccess(taskId, taskChanges) {
    return {
        type: actionTypes.PUT_TASK_SUCCESS,
        taskId,
        taskChanges,
    };
}

// err is shorthand for the error response, errorMessage is the display message taken from props.
function _reportTasksError(err, errorMessage) {
    return {
        type: actionTypes.REPORT_TASKS_ERROR,
        err,
        errorMessage,
    };
}
