import { initialize, reset } from 'redux-form';

import * as actionTypes from './actionTypes';
import apiService from '../../services/api';

export const setActiveInboxTab = tab => ({
    type: actionTypes.SET_ACTIVE_INBOX_TAB,
    tab,
});

export const setInboxFilter = filter => ({
    type: actionTypes.SET_INBOX_FILTER,
    filter,
});

export const clearInbox = () => ({
    type: actionTypes.CLEAR_INBOX,
});

export const archiveThread = ids => () => {
    return Promise.all(
        ids.map(id => new Promise((resolve, reject) => {
            apiService.messaging.archive(id, err =>
                (err ? reject(err) : resolve()),
            );
        })),
    );
};

export const unarchiveThread = ids => () => {
    return Promise.all(
        ids.map(id => new Promise((resolve, reject) => {
            apiService.messaging.unarchive(id, err =>
                (err ? reject(err) : resolve()),
            );
        })),
    );
};

export const markThreadAsRead = ids => () => {
    return Promise.all(
        ids.map(id => new Promise((resolve, reject) => {
            apiService.messaging.markAsRead(id, err =>
                (err ? reject(err) : resolve()),
            );
        })),
    );
};

export const deleteThread = ids => () => {
    return Promise.all(
        ids.map(id => new Promise((resolve, reject) => {
            apiService.messaging.delete(id, (err, response) =>
                (err ? reject(err) : resolve(response)));
        })),
    );
};

export const archiveMessage = id => () => {
    return new Promise((resolve, reject) => {
        apiService.messaging.archive(id, err =>
            (err ? reject(err) : resolve()),
        );
    });
};

export const unarchiveMessage = id => () => {
    return new Promise((resolve, reject) => {
        apiService.messaging.unarchive(id, err =>
            (err ? reject(err) : resolve()),
        );
    });
};

export const markAsUnread = id => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiService.messaging.markAsUnread(id, (err, response) =>
            (err ? reject(err) : resolve(response)));
    })
    .then(response => dispatch(_putMessageSuccess(response)));
};

export const deleteMessage = id => () => {
    return new Promise((resolve, reject) => {
        apiService.messaging.delete(id, (err, response) =>
            (err ? reject(err) : resolve(response)));
    });
};


const _putMessageSuccess = message => ({
    type: actionTypes.PUT_MESSAGE_SUCCESS,
    message,
    id: message.id,
});

export const markAsRead = id => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiService.messaging.markAsRead(id, (err, response) =>
            (err ? reject(err) : resolve(response)));
    })
    .then(response => dispatch(_putMessageSuccess(response)));
};

export const startReply = message => (dispatch) => {
    dispatch(_startReply({
        id: message.id,
        subject: message.subject,
        to: [message.from],
        from: message.owner,
    }));
};

export const startReplyAll = message => (dispatch) => {
    dispatch(_startReply({
        id: message.id,
        subject: message.subject,
        to: [message.from, ...message.to].filter(recipient => recipient !== message.owner),
        from: message.owner,
    }));
};

export const forwardMessage = message => (dispatch) => {
    dispatch(_startReply({
        forwardId: message.id,
        subject: message.subject,
        from: message.to,
    }));
};

export const discardReply = () => ({
    type: actionTypes.DISCARD_REPLY,
});

export const expandMessages = messageIds => ({
    type: actionTypes.EXPAND_MESSAGES,
    messageIds,
});

export const setExpandedMessages = messageIds => ({
    type: actionTypes.SET_EXPANDED_MESSAGES,
    messageIds,
});

export const setInboxPage = page => ({
    type: actionTypes.SET_INBOX_PAGE,
    page,
});

export const getInboxMessages = params => (dispatch) => {
    apiService.messaging.list((err, result) => {
        if (!err) {
            dispatch(_getInboxMessagesSuccess(result));
        }
    }, params);
};

export const getThreadContainingMessage = messageId => (dispatch) => {
    apiService.messaging.get(messageId, (err, messageResponse) => {
        if (!err) {
            dispatch(getThread(messageResponse.originalMessageId));
        }
    });
};

export const getThread = originalMessageId => (dispatch) => {
    dispatch(_getThread());
    apiService.messaging.getThread(originalMessageId, (err, response) => {
        dispatch(_getThreadSuccess(response));
    });
};

export const getInboxThreads = archived => (dispatch) => {
    apiService.messaging.listThreads((err, response) => {
        if (!err) {
            dispatch(_getInboxThreadsSuccess(response));
        }
    }, { archived });
};

/* Private actions */

const _getThread = () => ({
    type: actionTypes.GET_THREAD,
});

const _getThreadSuccess = thread => ({
    type: actionTypes.GET_THREAD_SUCCESS,
    thread,
});

const _getInboxThreadsSuccess = threads => ({
    type: actionTypes.GET_INBOX_THREADS_SUCCESS,
    threads,
});

const _getInboxMessagesSuccess = messages => ({
    type: actionTypes.GET_INBOX_MESSAGES_SUCCESS,
    messages,
});

const _startReply = reply => (dispatch) => {
    dispatch(initialize('message', reply));
    dispatch(reset('message'));
    dispatch({ type: actionTypes.START_REPLY, reply });
};
