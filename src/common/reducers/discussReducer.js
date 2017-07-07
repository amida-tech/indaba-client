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
    }, {
        id: 104,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Sat Jun 10 2017 08:15:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'How would they even answer this...',
            userId: 22,
        }],
    }],
}, {
    taskId: 109,
    discuss: [{
        id: 17,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Sun Jun 11 2017 08:15:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'The meaning of this question isn\'t clear.',
            userId: 31,
        }, {
            timestamp: 'Mon Jun 12 2017 09:43:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'I disagree.',
            userId: 71,
        }],
        review: true,
    }, {
        id: 21,
        value: 1,
        review: false,
        comment: 'This list is too short.',
    }, {
        id: 18,
        value: 5,
        review: false,
        comment: 'This is difficult to measure.',
    }, {
        id: 23,
        value: 'Needs work.',
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
            comment: 'I also dislike this.',
            userId: 31,
        }],
        review: false,
        comment: 'Needs to be multiple checkboxes.',
    }, {
        id: 99,
        value: true,
        review: true,
    }, {
        id: 98,
        value: true,
        review: true,
    }, {
        id: 104,
        value: true,
        review: true,
    }, {
        id: 117,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Wed Jun 14 2017 11:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'I do not understand this.',
            userId: 31,
        }, {
            timestamp: 'Wed Jun 14 2017 12:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'Could you explain a bit more, Ellen?',
            userId: 41,
        }, {
            timestamp: 'Wed Jun 14 2017 14:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'Does this include income from a secondary job?',
            userId: 31,
        }, {
            timestamp: 'Thu Jun 15 2017 12:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'I am overriding this.',
            userId: 71,
        }],
    }, {
        id: 209,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Wed Jun 14 2017 11:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'I don\'t understand this question.',
            userId: 31,
        }, {
            timestamp: 'Wed Jun 14 2017 12:42:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'I concur with Ellen, this isn\'t clear enough.',
            userId: 25,
        }],
    }],
}, {
    taskId: 222,
    discuss: [{
        id: 17,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Mon Jun 12 2017 12:34:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'Farmer or flea market?',
            userId: 22,
        }],
        review: false,
        comment: 'What was the question?',
    }, {
        id: 21,
        value: 0,
        review: true,
    }, {
        id: 98,
        value: true,
        flag: true,
        flagHistory: [{
            timestamp: 'Mon Jun 12 2017 12:34:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'Versus reported?',
            userId: 22,
        }, {
            timestamp: 'Mon Jun 12 2017 14:34:15 GMT-0400 (Eastern Daylight Time)',
            comment: 'Good question.',
            userId: 31,
        }],
    }],
}];

export const DiscussReducer = (state = initialState, action) => {
    const taskIndex = _.findIndex(state, discuss => discuss.taskId === action.taskId);
    const questionIndex = state[taskIndex] ?
        _.findIndex(state[taskIndex].discuss, chat => chat.id === action.activeId) :
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
