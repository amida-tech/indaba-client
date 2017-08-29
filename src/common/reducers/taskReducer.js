import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/taskActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';
import { REMOVE_USER } from '../actionTypes/projectActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
    },
    projectId: 0,
    userId: 0,
    data: [{
        endDate: '',
        userIds: [],
    }],
};

export const TaskReducer = (state = initialState, action) => {
    const projectIndex = _.findIndex(state.data, projectTasks =>
        projectTasks.projectId === action.projectId);
    const taskIndex = state[projectIndex] ?
        _.findIndex(state[projectIndex].tasks, task => task.id === action.taskId) :
        null;
    switch (action.type) {
    case type.GET_TASKS_BY_PROJECT_SUCCESS:
        return update(state, {
            projectId: { $set: action.projectId },
            data: { $set: action.tasks },
        });
    case type.GET_TASKS_BY_USER_SUCCESS:
        return update(state, {
            userId: { $set: action.userId },
            data: { $set: action.tasks },
        });
    case type.POST_TASK_SUCCESS:
        return update(state, { data: { $push: [action.task] } });
    case type.UPDATE_TASK_DUE_DATE:
        return update(state, { [projectIndex]: { tasks: { [taskIndex]:
            { $merge: { endDate: action.endDate } } } } });
    case type.REASSIGN_TASK:
        return update(state, { data: { userId: { $set: action.reassignId } } });
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, { $push: [action.wizard.task] });
    case REMOVE_USER:
        return update(state, { [projectIndex]: {
            tasks: { $apply: tasks => tasks.filter(task => task.userId !== action.userId) } } });
    case type.REPORT_TASKS_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    default:
        return state;
    }
};
