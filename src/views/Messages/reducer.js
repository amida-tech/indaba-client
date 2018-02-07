import update from 'immutability-helper';
import { sortBy } from 'lodash';

import config from '../../config';
import * as actionTypes from './actionTypes';
import { LOG_OUT } from '../../common/actionTypes/navActionTypes';
import { FILTERS, INBOX_TABS } from './constants';

const initialState = {
    ui: {
        inboxTab: INBOX_TABS.INBOX,
        filter: FILTERS.ALL_MESSAGES,
        reply: false,
        expandedMessages: [],
    },
    messages: [],
    thread: [],
    inboxList: [],
};

const transformServerMessageToReduxMessage = message =>
    Object.assign(message, {
        systemMessage: message.from === config.SYS_MESSAGE_USER,
        unread: message.readAt === null,
    });

export default (state = initialState, action) => {
    const messageIndex = state.messages.findIndex(message => message.id === action.id);
    const threadIndex = state.thread.findIndex(message => message.id === action.id);

    switch (action.type) {
    case actionTypes.SET_ACTIVE_INBOX_TAB:
        return update(state, { ui: { inboxTab: { $set: action.tab } } });
    case actionTypes.SET_INBOX_FILTER:
        return update(state, { ui: { filter: { $set: action.filter } } });
    case actionTypes.CLEAR_INBOX:
        return update(state, { inboxList: { $set: [] } });
    case actionTypes.START_REPLY:
        return update(state, { ui: {
            reply: { $set: action.reply },
        } });
    case actionTypes.DISCARD_REPLY:
        return update(state, { ui: {
            reply: { $set: false },
        } });
    case actionTypes.PUT_MESSAGE_SUCCESS:
        return threadIndex === -1 ?
        state :
        update(state, { thread:
            { [threadIndex]: { $set: transformServerMessageToReduxMessage(action.message) } },
        });
    case actionTypes.UPDATE_MESSAGE:
        return update(state, {
            messages: (
                messageIndex !== -1 ?
                { [messageIndex]: { $set: transformServerMessageToReduxMessage(action.message) } } :
                { $push: [transformServerMessageToReduxMessage(action.message)] }
            ),
        });
    case actionTypes.EXPAND_MESSAGES:
        return update(state, { ui: {
            expandedMessages: { $push: action.messageIds },
        } });
    case actionTypes.SET_EXPANDED_MESSAGES:
        return update(state, { ui: {
            expandedMessages: { $set: action.messageIds },
        } });
    case actionTypes.DELETE_MESSAGE_SUCCESS:
        return update(state, {
            messages: { $splice: [[messageIndex, 1]] },
        });
    case actionTypes.GET_THREAD_SUCCESS:
        return update(state, {
            thread: { $set: sortBy(action.thread, 'createdAt') },
        });
    case actionTypes.GET_INBOX_THREADS_SUCCESS:
        return update(state, {
            inboxList: { $set: action.threads },
        });
    case actionTypes.GET_INBOX_MESSAGES_SUCCESS:
        return update(state, {
            inboxList: { $set: action.messages.map(transformServerMessageToReduxMessage) },
        });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
