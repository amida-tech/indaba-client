import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/discussActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
    },
    data: [],
};

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
    case type.GET_DISCUSS_SUCCESS:
        return update(state, { data: { $set: action.discuss } });
    case type.REPORT_DISCUSS_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
