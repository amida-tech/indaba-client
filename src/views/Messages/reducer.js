import update from 'immutability-helper';
import _ from 'lodash';

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
};

const transformServerMessageToReduxMessage = message =>
    Object.assign(message, {
        timestamp: message.createdAt,
        systemMessage: message.from === config.SYS_MESSAGE_USER,
    });

export default (state = initialState, action) => {
    const messageIndex = state.messages.findIndex(message => message.id === action.id);
    const messageIndices = action.ids && action.ids.map(
        id => state.messages.findIndex(message => message.id === id));

    switch (action.type) {
    case actionTypes.SET_ACTIVE_INBOX_TAB:
        return update(state, { ui: { inboxTab: { $set: action.tab } } });
    case actionTypes.SET_INBOX_FILTER:
        return update(state, { ui: { filter: { $set: action.filter } } });
    case actionTypes.MARK_MESSAGE_AS_READ:
        return update(state, { messages: { [messageIndex]: {
            readAt: { $set: new Date().toISOString() },
        } } });
    case actionTypes.MARK_MESSAGE_AS_UNREAD:
        return update(state, { messages: {
            [messageIndex]: { $unset: ['readAt'] },
        } });
    case actionTypes.ARCHIVE_THREAD_SUCCESS: {
        const edit = { messages: {} };
        messageIndices.forEach((index) => {
            edit.messages[index] = {
                isArchived: { $set: true },
            };
        });
        return update(state, edit);
    }
    case actionTypes.UNARCHIVE_MESSAGE_SUCCESS:
        return update(state, { messages: { [messageIndex]: {
            isArchived: { $set: false },
        } } });
    case actionTypes.START_REPLY:
        return update(state, { ui: {
            reply: { $set: action.reply },
        } });
    case actionTypes.DISCARD_REPLY:
        return update(state, { ui: {
            reply: { $set: false },
        } });
    case actionTypes.LIST_MESSAGES_SUCCESS:
        return update(state, {
            messages: { $apply:
                message => _.unionBy(message,
                    action.result.map(transformServerMessageToReduxMessage), 'id'),
            },
        });
    case actionTypes.LIST_ARCHIVED_MESSAGES_SUCCESS:
        return update(state, {
            messages: { $apply:
                message => _.unionBy(message,
                    action.result.map(transformServerMessageToReduxMessage), 'id'),
            },
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
            thread: { $set: action.thread.messages },
        });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
