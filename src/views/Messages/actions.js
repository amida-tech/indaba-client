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

export const getMessages = () => (dispatch) => {
    dispatch(_getMessages());
    apiService.messaging.list((err, result) => {
        if (err) {
            dispatch(_getMessagesFailure(err));
        } else {
            dispatch(_getMessagesSuccess(result));
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

export const _getMessages = () => ({
    type: actionTypes.GET_MESSAGES,
});

export const _getMessagesFailure = err => ({
    type: actionTypes.GET_MESSAGES_FAILURE,
    err,
});

export const _getMessagesSuccess = result => ({
    type: actionTypes.GET_MESSAGES_SUCCESS,
    result,
});
