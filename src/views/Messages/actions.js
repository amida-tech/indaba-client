import * as actionTypes from './actionTypes';

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

export const startReply = () => ({
    type: actionTypes.START_REPLY,
});
