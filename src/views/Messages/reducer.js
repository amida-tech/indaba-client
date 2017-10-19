import { FILTERS, INBOX_TABS } from './constants';

const initialState = {
    ui: {
        inboxTab: INBOX_TABS.INBOX,
        filter: FILTERS.ALL_MESSAGES,
    },
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};
