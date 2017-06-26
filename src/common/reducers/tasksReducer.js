import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/tasksActionTypes';

const initialState = [{
    projectId: 101,
    tasks: [{
        id: 81,
        userId: 22,
        stage: 0,
        subject: 0,
        response: [{
            id: 17,
            value: false,
            review: true,
        }, {
            id: 21,
        }],
    }, {
        id: 109,
        userId: 31,
        stage: 0,
        subject: 1,
        response: [{
            id: 17,
            value: true,
            flag: true,
            flagHistory: [{
                timestamp: 'Sun Jun 11 2017 08:15:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'YELLOW FLAG!',
                userId: 31,
            }, {
                timestamp: 'Mon Jun 12 2017 09:43:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'Well too bad cupcake!',
                userId: 71,
            }],
            review: true,
        }, {
            id: 21,
            value: 1,
            review: false,
            comment: 'Gross topping.',
        }, {
            id: 18,
            value: 5,
            review: false,
            comment: 'So much food.',
        }, {
            id: 23,
            value: 'It was the best of pizza, it was the worst of pizza.',
            flag: true,
            flagHistory: [{
                timestamp: 'Wed Jun 14 2017 10:42:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I dislike this.',
                userId: 31,
            }],
            review: true,
        }, {
            id: 34,
            value: [0, 2],
            flag: true,
            flagHistory: [{
                timestamp: 'Tue Jun 13 2017 11:42:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I REALLY dislike this.',
                userId: 31,
            }],
            review: false,
            comment: 'Bad combo.',
        }],
    }, {
        id: 222,
        userId: 41,
        stage: 1,
        subject: 0,
        dueDate: '9/9/2017',
        response: [{
            id: 17,
            value: true,
            flag: true,
            flagHistory: [{
                timestamp: 'Mon Jun 12 2017 12:34:15 GMT-0400 (Eastern Daylight Time)',
                comment: 'I like flags.',
                userId: 22,
            }],
            review: false,
            comment: 'What was the question?',
        }, {
            id: 21,
            value: 0,
            review: true,
        }],
    }, {
        id: 13,
        userId: 25,
        stage: 1,
        subject: 2,
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
    case type.UPDATE_FLAGGED_QUESTION: // TODO: FIX
        return update(state, { [projectIndex]: { tasks: { [taskIndex]:
        { response: { [action.data.active]:
        { $set: { flag: !action.data.resolved },
        } } } } } });
    case type.SET_TASK_OPTIONS: // UPDATE LATER.
        return state;
    default:
        return state;
    }
};

// flagHistory: { $push: [{
//     timestamp: action.data.timestamp,
//     comment: action.data.comment,
//     userId: action.data.signatureId,
// }] }
