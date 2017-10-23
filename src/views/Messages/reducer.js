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
    }, {
        id: 128,
        timestamp: '2017-07-21T11:44:59.627Z',
        subject: 'Information About Survey',
        from: 'Mae Lamb',
        archived: true,
        readAt: '2017-07-21T11:45:47.591Z',
    }, {
        id: 112,
        timestamp: '2017-07-21T11:40:23.199Z',
        subject: 'Stage Force Completed',
        from: 'Olga Harrington',
    }, {
        id: 82,
        timestamp: '2017-07-21T11:37:51.348Z',
        subject: 'Borrow a Clipboard?',
        from: 'Earl Campbell',
        archived: true,
    }, {
        id: 63,
        timestamp: '2017-06-21T11:37:51.348Z',
        subject: 'Blast From The Past',
        from: 'Clara',
    }],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SET_ACTIVE_INBOX_TAB:
        return update(state, { ui: { inboxTab: { $set: action.tab } } });
    case actionTypes.SET_INBOX_FILTER:
        return update(state, { ui: { filter: { $set: action.filter } } });
    default:
        return state;
    }
};
