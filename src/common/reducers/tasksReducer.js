import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/tasksActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';
import { REMOVE_USER } from '../actionTypes/projectActionTypes';

const initialState = [{
    projectId: 101,
    tasks: [{
        id: 81,
        userId: 22,
        stage: 0,
        subject: 0,
    }, {
        id: 109,
        userId: 31,
        stage: 0,
        subject: 1,

    }, {
        id: 222,
        userId: 41,
        stage: 1,
        subject: 0,
        dueDate: '9/9/2017',
    }, {
        id: 13,
        userId: 25,
        stage: 1,
        subject: 2,
        dueDate: '9/9/2017',
    }],
}];

export const TasksReducer = (state = initialState, action) => {
    const projectIndex = _.findIndex(state, projectTasks =>
        projectTasks.projectId === action.projectId);
    const taskIndex = state[projectIndex] ?
        _.findIndex(state[projectIndex].tasks, task => task.id === action.taskId) :
        null;
    switch (action.type) {
    case type.ASSIGN_TASK: {
        const newTask = {
            id: state[projectIndex].tasks.length, // TODO: Assign new IDs.
            userId: action.userId,
            stage: action.task.stage,
            subject: action.task.subject,
        };
        return update(state, { [projectIndex]: { tasks: { $push: [newTask] } } });
    }
    case type.UPDATE_TASK_DUE_DATE:
        return update(state, { [projectIndex]: { tasks: { [taskIndex]:
            { $merge: { dueDate: action.dueDate } } } } });
    case type.REASSIGN_TASK:
        return update(state, { [projectIndex]: { tasks: { [taskIndex]:
            { userId: { $set: action.reassignId } } } } });
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, { $push: [action.wizard.task] });
    case REMOVE_USER:
        return update(state, { [projectIndex]: {
            tasks: { $apply: tasks => tasks.filter(task => task.userId !== action.userId) } } });
    default:
        return state;
    }
};
