import * as actionTypes from '../actionTypes/tasksActionTypes';

export function assignTask(assignment, projectId) {
    console.log(actionTypes)
    return {
        type: actionTypes.ASSIGN_TASK,
        payload: assignment,
        projectId,
    };
}

export function updateTask(task, projectId) {
    return {
        type: actionTypes.UPDATE_TASK,
        task,
        projectId,
    };
}

// Flag Sidebar.
export function updateTaskDueDate(taskId, projectId, dueDate) {
   return {
       type: actionTypes.UPDATE_TASK_DUE_DATE,
       taskId,
       projectId,
       dueDate,
   };
}

export function updateFlaggedQuestion(data){
   return {
       type: actionTypes.UPDATE_FLAGGED_QUESTION,
       data,
   };
}

export function setTaskOptions() {
    return {
        type: actionTypes.SET_TASK_OPTIONS,
    };
}
