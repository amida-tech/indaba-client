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

export const setToQuery = query => ({
    type: actionTypes.SET_TO_QUERY,
    query,
});

export const archiveThread = ids => () => Promise.all(ids.map(id => apiService.messaging.archive(id)));

export const unarchiveThread = ids => () => Promise.all(ids.map(id => apiService.messaging.unarchive(id)));

export const markThreadAsRead = ids => () => Promise.all(ids.map(id => apiService.messaging.markAsRead(id)));

export const deleteThread = ids => () => Promise.all(ids.map(id => apiService.messaging.delete(id)));

export const archiveMessage = id => () => apiService.messaging.archive(id);

export const unarchiveMessage = id => () => apiService.messaging.unarchive(id);

export const markAsUnread = id => dispatch => apiService.messaging.markAsUnread(id)
    .then(response => dispatch(_putMessageSuccess(response)));

export const deleteMessage = id => () => apiService.messaging.delete(id);


const _putMessageSuccess = message => ({
    type: actionTypes.PUT_MESSAGE_SUCCESS,
    message,
    id: message.id,
});

export const markAsRead = id => dispatch => apiService.messaging.markAsRead(id)
    .then(response => dispatch(_putMessageSuccess(response)));

export const startReply = message => _startReply({
    id: message.id,
    subject: message.subject,
    to: [message.from],
    from: message.owner,
});

export const startReplyAll = message => _startReply({
    id: message.id,
    subject: message.subject,
    to: [message.from, ...message.to].filter(recipient => recipient !== message.owner),
    from: message.owner,
});

export const forwardMessage = message => _startReply({
    forwardId: message.id,
    subject: message.subject,
    from: message.to,
});

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

export const getInboxMessages = params => dispatch => apiService.messaging.list(params)
    .then(result => dispatch(_getInboxMessagesSuccess(result)));

export const getThreadContainingMessage = messageId => dispatch => apiService.messaging.get(messageId)
    .then(messageResponse => dispatch(getThread(messageResponse.originalMessageId)));

export const getThread = originalMessageId => (dispatch) => {
    dispatch(_getThread());
    return apiService.messaging.getThread(originalMessageId)
        .then(response => dispatch(_getThreadSuccess(response)));
};

export const getInboxThreads = params => dispatch => apiService.messaging.listThreads(params)
    .then(response => dispatch(_getInboxThreadsSuccess(response)));

/* Private actions */

const _getThread = () => ({
    type: actionTypes.GET_THREAD,
});

const _getThreadSuccess = thread => ({
    type: actionTypes.GET_THREAD_SUCCESS,
    thread,
});

const _getInboxThreadsSuccess = response => ({
    type: actionTypes.GET_INBOX_THREADS_SUCCESS,
    response,
});

const _getInboxMessagesSuccess = response => ({
    type: actionTypes.GET_INBOX_MESSAGES_SUCCESS,
    response,
});

const _startReply = reply => (dispatch) => {
    dispatch(initialize('message', reply));
    dispatch(reset('message'));
    dispatch({ type: actionTypes.START_REPLY, reply });
};
