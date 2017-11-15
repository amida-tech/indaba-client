import update from 'immutability-helper';
import _ from 'lodash';

import * as actionTypes from './actionTypes';
import { FILTERS, INBOX_TABS } from './constants';

const initialState = {
    ui: {
        inboxTab: INBOX_TABS.INBOX,
        filter: FILTERS.ALL_MESSAGES,
        reply: false,
    },
    messages: [],
};

const transformServerMessageToReduxMessage = message =>
    Object.assign(message, {
        timestamp: message.createdAt,
    });

export default (state = initialState, action) => {
    const messageIndex = state.messages.findIndex(message => message.id === action.id);

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
    case actionTypes.ARCHIVE_MESSAGE_SUCCESS:
        return update(state, { messages: { [messageIndex]: {
            isArchived: { $set: true },
        } } });
    case actionTypes.UNARCHIVE_MESSAGE:
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
    case actionTypes.DELETE_MESSAGE_SUCCESS:
        return update(state, {
            messages: { $splice: [[messageIndex, 1]] },
        });
    default:
        return state;
    }
};
