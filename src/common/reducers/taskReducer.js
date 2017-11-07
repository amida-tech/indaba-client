import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/taskActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';
import { DELETE_PROJECT_USER_SUCCESS } from '../actionTypes/projectActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
    },
    projectId: 0,
    userId: 0,
    data: [{
        id: -1,
        title: '',
        description: '',
        uoaId: -1,
        stepId: -1,
        endDate: '',
        isCompleted: false,
        userIds: [],
        projectId: -1,
        surveyId: -1,
        flagCount: 0,
    }],
};

export const TaskReducer = (state = initialState, action) => {
    const projectIndex = _.findIndex(state.data, projectTasks =>
        projectTasks.projectId === action.projectId);
    const taskIndex = state[projectIndex] ?
        _.findIndex(state[projectIndex].tasks, task => task.id === action.taskId) :
        null;
    switch (action.type) {
    case type.GET_TASKS_BY_PROJECT_SUCCESS: {
        return update(state, {
            projectId: { $set: action.projectId },
            data: { $set: action.tasks },
        });
    }
    case type.GET_TASK_BY_ID_SUCCESS:
        return state.data[0].id < 0 ?
            update(state, { projectId: { $set: action.projectId },
                data: { $set: [action.task] } }) :
            update(state, { projectId: { $set: action.projectId },
                data: { [taskIndex]: { $set: action.task } } });
    case type.GET_TASKS_BY_USER_SUCCESS:
        return update(state, {
            userId: { $set: action.userId },
            data: { $set: action.tasks },
        });
    case type.POST_TASK_SUCCESS:
        return update(state, { data: { $push: [action.task] } });
    case type.UPDATE_TASK_DUE_DATE:
        return update(state, { data: { [taskIndex]:
            { $merge: { endDate: action.endDate } } } });
    case type.REASSIGN_TASK:
        return update(state, { data: { userId: { $set: action.reassignId } } });
    case DELETE_PROJECT_USER_SUCCESS:
        return update(state, { data: { $apply: data => data.filter(task =>
                !task.userIds.includes(action.userId)) } });
    case type.REPORT_TASKS_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
