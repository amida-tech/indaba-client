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

export const markMessageAsRead = id => ({
    type: actionTypes.MARK_MESSAGE_AS_READ,
    id,
});

export const markMessageAsUnread = id => ({
    type: actionTypes.MARK_MESSAGE_AS_UNREAD,
    id,
});

export const archiveMessage = id => (dispatch) => {
    dispatch(_archiveMessage());
    apiService.messaging.archive(id, (err) => {
        if (err) {
            dispatch(_archiveMessageFailure(err));
        } else {
            dispatch(_archiveMessageSuccess(id));
        }
    });
};

export const unarchiveMessage = id => ({
    type: actionTypes.UNARCHIVE_MESSAGE,
    id,
});

export const startReply = message => (dispatch) => {
    dispatch(_startReply({
        id: message.id,
        subject: message.subject,
        to: [message.from],
        from: message.to,
    }));
};

export const forwardMessage = message => (dispatch) => {
    dispatch(_startReply({
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

export const sendMessage = message => (dispatch) => {
    dispatch(_sendMessage());
    apiService.messaging.send(message, (err) => {
        if (err) {
            dispatch(_sendMessageFailure(err));
        } else {
            dispatch(_sendMessageSuccess());
        }
    });
};

export const replyToMessage = (id, message) => (dispatch) => {
    dispatch(_replyToMessage());
    apiService.messaging.reply(id, message, (err) => {
        if (err) {
            dispatch(_replyToMessageFailure(err));
        } else {
            dispatch(_replyToMessageSuccess());
        }
    });
};

export const listMessages = () => (dispatch) => {
    dispatch(_listMessages());
    apiService.messaging.list((err, result) => {
        if (err) {
            dispatch(_listMessagesFailure(err));
        } else {
            dispatch(_listMessagesSuccess(result));
        }
    });
};

export const listArchivedMessages = () => (dispatch) => {
    dispatch(_listArchivedMessages());
    apiService.messaging.listArchived((err, result) => {
        if (err) {
            dispatch(_listArchivedMessagesFailure(err));
        } else {
            dispatch(_listArchivedMessagesSuccess(result));
        }
    });
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

/* Private actions */

export const _startReply = reply => (dispatch) => {
    dispatch(initialize('message', reply));
    dispatch(reset('message'));
    dispatch({ type: actionTypes.START_REPLY, reply });
};

export const _sendMessage = () => ({
    type: actionTypes.SEND_MESSAGE,
});

export const _sendMessageFailure = err => ({
    type: actionTypes.SEND_MESSAGE_FAILURE,
    err,
});

export const _sendMessageSuccess = () => ({
    type: actionTypes.SEND_MESSAGE_SUCCESS,
});

export const _replyToMessage = () => ({
    type: actionTypes.REPLY_TO_MESSAGE,
});

export const _replyToMessageFailure = err => ({
    type: actionTypes.REPLY_TO_MESSAGE_FAILURE,
    err,
});

export const _replyToMessageSuccess = () => ({
    type: actionTypes.REPLY_TO_MESSAGE_SUCCESS,
});

export const _listMessages = () => ({
    type: actionTypes.LIST_MESSAGES,
});

export const _listMessagesFailure = err => ({
    type: actionTypes.LIST_MESSAGES_FAILURE,
    err,
});

export const _listMessagesSuccess = result => ({
    type: actionTypes.LIST_MESSAGES_SUCCESS,
    result,
});

export const _listArchivedMessages = () => ({
    type: actionTypes.LIST_ARCHIVED_MESSAGES,
});

export const _listArchivedMessagesFailure = err => ({
    type: actionTypes.LIST_ARCHIVED_MESSAGES_FAILURE,
    err,
});

export const _listArchivedMessagesSuccess = result => ({
    type: actionTypes.LIST_ARCHIVED_MESSAGES_SUCCESS,
    result,
});

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

export const _archiveMessage = () => ({
    type: actionTypes.ARCHIVE_MESSAGE,
});

export const _archiveMessageFailure = err => ({
    type: actionTypes.ARCHIVE_MESSAGE_FAILURE,
    err,
});

export const _archiveMessageSuccess = id => ({
    type: actionTypes.ARCHIVE_MESSAGE_SUCCESS,
    id,
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
