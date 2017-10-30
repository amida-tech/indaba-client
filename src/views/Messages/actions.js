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

export const archiveMessage = id => ({
    type: actionTypes.ARCHIVE_MESSAGE,
    id,
});

export const unarchiveMessage = id => ({
    type: actionTypes.UNARCHIVE_MESSAGE,
    id,
});

export const replyToMessage = message => (dispatch) => {
    dispatch(_startReply({
        subject: message.subject,
        to: message.from,
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

/** Private actions **/

export const _startReply = reply => ({
    type: actionTypes.START_REPLY,
    reply,
});

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

export const _getMessage = () => ({
    type: actionTypes.GET_MESSAGE,
});

export const _getMessageFailure = err => ({
    type: actionTypes.GET_MESSAGE_FAILURE,
    err,
});

export const _getMessageSuccess = result => ({
    type: actionTypes.GET_MESSAGE_SUCCESS,
    result,
    id: result.id,
});
