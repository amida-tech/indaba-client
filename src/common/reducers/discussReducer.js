import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/discussActionTypes';

const initialState = [{
    taskId: 81,
    discuss: [{
        id: 17,
        value: false,
        review: true,
    }, {
        id: 21,
    }],
}, {
    taskId: 109,
    discuss: [{
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
    taskId: 222,
    discuss: [{
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
}];

export const DiscussReducer = (state = initialState, action) => {
    const taskIndex = _.findIndex(state, discuss => discuss.taskId === action.taskId);
    const questionIndex = state[taskIndex] ?
        _.findIndex(state[taskIndex].discuss, chat => chat.id === action.data.active) :
        null;

    switch (action.type) {
    case type.UPDATE_FLAGGED_QUESTION:
        return update(state, { [taskIndex]: { discuss: { [questionIndex]: {
            flag: { $set: !action.data.resolved },
            flagHistory: { $push: [{
                timestamp: action.data.timestamp,
                comment: action.data.comment,
                userId: action.data.signatureId,
            }] } } } } });
    default:
        return state;
    }
};
