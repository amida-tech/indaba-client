import update from 'immutability-helper';
import * as type from '../actionTypes/tasksActionTypes';
import _ from 'lodash';

const initialState = [{
    projectId: 0,
    tasks: [{
        id: 0,
        userId: 2,
        stage: 0,
        subject: 0,
        response: [{
            id: 0,
            value: false,
            review: true,
        }, {
            id: 1,
        }],
    }, {
        id: 1,
        userId: 3,
        stage: 0,
        subject: 1,
        response: [{
            id: 0,
            value: true,
            flag: true,
            flagHistory: [{
                timestamp: 'Sun Jun 11 2017 08:15:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'YELLOW FLAG!',
                userId: 3,
            }, {
                timestamp: 'Mon Jun 12 2017 09:43:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'Well too bad cupcake!',
                userId: 1,
            }],
            review: true,
        }, {
            id: 1,
            value: 1,
            review: false,
            comment: 'Gross topping.',
        }, {
            id: 2,
            value: 5,
            review: false,
            comment: 'So much food.',
        }, {
            id: 3,
            value: 'It was the best of pizza, it was the worst of pizza.',
            flag: true,
            flagHistory: [{
                timestamp: 'Wed Jun 14 2017 10:42:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I dislike this.',
                userId: 3,
            }],
            review: true,
        }, {
            id: 4,
            value: [0, 2],
            flag: true,
            flagHistory: [{
                timestamp: 'Tue Jun 13 2017 11:42:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I REALLY dislike this.',
                userId: 3,
            }],
            review: false,
            comment: 'Bad combo.',
        }],
    }, {
        id: 2,
        userId: 4,
        stage: 1,
        subject: 0,
        dueDate: '9/9/2017',
        response: [{
            id: 0,
            value: true,
            flag: true,
            flagHistory: [{
                timestamp: 'Mon Jun 12 2017 12:34:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I like flags.',
                userId: 2,
            }],
            review: false,
            comment: 'What was the question?',
        }, {
            questionId: 1,
            value: 0,
            review: true,
        }],
    }, {
        id: 3,
        userId: 5,
        stage: 1,
        subject: 2,
    }],
}];

export const TasksReducer = (state = initialState, action) => {
    let projectIndex = _.findIndex(state, (projectTasks) =>
        projectTasks.projectId === action.projectId);
    let taskIndex = state[projectIndex] ?
        _.findIndex(state[projectIndex].tasks, (task) => task.id === action.taskId):
        null;
    switch(action.type) {
        case type.ASSIGN_TASK: // Works now.
            const newTask = {
                id: state[projectIndex].tasks.length, // TODO: Assign new IDs.
                userId: action.userId,
                stage: action.task.stage,
                subject: action.task.subject,
            };
            return update(state, { [projectIndex]: { tasks: { $push: [newTask] } } });
        case type.UPDATE_TASK_DUE_DATE:
            return update(state, { [projectIndex]: { tasks: { [taskIndex]:
    				{ $merge: { dueDate: action.dueDate } } } } });
        case type.UPDATE_FLAGGED_QUESTION: // Come back to when refactoring FlagSidebar.
            console.log(action.data);
            return update(state, { projects: { [action.data.projectId]:
            { tasks: { [taskIndex]:
            { response: { [action.data.questionId]:
            { flag: { $set: !action.data.resolved },
                flagHistory: { $push: [{
                    timestamp: action.data.timestamp,
                    comment: action.data.comment,
                    userId: action.data.signatureId,
                }] } } } } } } } });
        case type.SET_TASK_OPTIONS:
            // UPDATE LATER.
            return update(state, { ui: { taskOptions: {
                show: { $set: false },
                task: { $set: {} },
            } } } );
        default:
            return state;
    }
};
