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

export const markMessageAsRead = id => ({
    type: actionTypes.MARK_MESSAGE_AS_READ,
    id,
});

export const markMessageAsUnread = id => ({
    type: actionTypes.MARK_MESSAGE_AS_UNREAD,
    id,
});

export const archiveThread = ids => () => {
    const archivePromises = [];
    ids.forEach(id =>
        archivePromises.push(new Promise((resolve, reject) => {
            apiService.messaging.archive(id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })),
    );
    return Promise.all(archivePromises);
};

export const unarchiveThread = ids => () => {
    const unarchivePromises = [];
    ids.forEach(id =>
        unarchivePromises.push(new Promise((resolve, reject) => {
            apiService.messaging.unarchive(id, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })),
    );
    return Promise.all(unarchivePromises);
};

export const unarchiveMessage = id => (dispatch) => {
    return new Promise((resolve, reject) => {
        apiService.messaging.unarchive(id, (err) => {
            if (err) {
                reject(err);
            } else {
                dispatch(_unarchiveMessageSuccess(id));
                resolve(id);
            }
        });
    });
};

const _unarchiveMessageSuccess = id => ({
    type: actionTypes.UNARCHIVE_MESSAGE_SUCCESS,
    id,
});

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

export const updateMessage = message => (dispatch) => {
    dispatch(_updateMessage(message));
};

export const expandMessages = messageIds => ({
    type: actionTypes.EXPAND_MESSAGES,
    messageIds,
});

export const setExpandedMessages = messageIds => ({
    type: actionTypes.SET_EXPANDED_MESSAGES,
    messageIds,
});

export const getInboxMessages = params => (dispatch) => {
    apiService.messaging.list((err, result) => {
        if (!err) {
            dispatch(_getInboxMessagesSuccess(result));
        }
    }, params);
};

export const getMessage = id => (dispatch) => {
    dispatch(_getMessage());
    apiService.messaging.get(id, (err, result) => {
        if (err) {
            dispatch(_getMessageFailure(err));
        } else {
            dispatch(_getMessageSuccess(result));
        }
    });
};

export const deleteMessage = id => (dispatch) => {
    dispatch(_deleteMessage());
    apiService.messaging.delete(id, (err, result) => {
        if (err) {
            dispatch(_deleteMessageFailure(err));
        } else {
            dispatch(_deleteMessageSuccess(result));
        }
    });
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

export const _startReply = reply => (dispatch) => {
    dispatch(initialize('message', reply));
    dispatch(reset('message'));
    dispatch({ type: actionTypes.START_REPLY, reply });
};

export const _getMessage = () => ({
    type: actionTypes.GET_MESSAGE,
});

export const _getMessageFailure = err => ({
    type: actionTypes.GET_MESSAGE_FAILURE,
    err,
});

export const _getMessageSuccess = result => (dispatch) => {
    dispatch(_updateMessage(result));
};

export const _updateMessage = message => ({
    type: actionTypes.UPDATE_MESSAGE,
    id: message.id,
    message,
});

export const _deleteMessage = () => ({
    type: actionTypes.DELETE_MESSAGE,
});

export const _deleteMessageFailure = err => ({
    type: actionTypes.DELETE_MESSAGE_FAILURE,
    err,
});

export const _deleteMessageSuccess = id => ({
    type: actionTypes.DELETE_MESSAGE_SUCCESS,
    id,
});
