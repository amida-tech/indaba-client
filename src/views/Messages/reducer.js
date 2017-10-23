import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { FILTERS, INBOX_TABS } from './constants';

const initialState = {
    ui: {
        inboxTab: INBOX_TABS.INBOX,
        filter: FILTERS.ALL_MESSAGES,
    },
    messages: [{
        id: 129,
        timestamp: '2017-07-21T11:45:47.591Z',
        subject: 'Flagged question',
        from: 'Abbie Hayes',
        readAt: '2017-07-21T11:45:47.591Z',
        message: 'A question on your survey  has been flagged. Click {{here}} to review.',
    }, {
        id: 128,
        timestamp: '2017-07-21T11:44:59.627Z',
        subject: 'Information About Survey',
        from: 'Mae Lamb',
        archived: true,
        readAt: '2017-07-21T11:45:47.591Z',
        message: 'Here\'s the additional information you requested regarding the new survey',
    }, {
        id: 112,
        timestamp: '2017-07-21T11:40:23.199Z',
        subject: 'Stage Force Completed',
        from: 'Olga Harrington',
        message: 'Stage "Secondary Review" has been force completed',
    }, {
        id: 82,
        timestamp: '2017-07-21T11:37:51.348Z',
        subject: 'Borrow a Clipboard?',
        from: 'Earl Campbell',
        archived: true,
        message: 'Help! I need to collect this survey data but forgot my clipboard at home. Can I borrow yours?',
    }, {
        id: 63,
        timestamp: '2017-06-21T11:37:51.348Z',
        subject: 'Blast From The Past',
        from: 'Clara',
        message: 'Remember me?!?',
    }],
};

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
    case actionTypes.ARCHIVE_MESSAGE:
        return update(state, { messages: { [messageIndex]: {
            archived: { $set: true },
        } } });
    default:
        return state;
    }
};
