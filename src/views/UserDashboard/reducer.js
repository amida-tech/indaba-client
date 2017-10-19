import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_TASKS,
    },
    messages: [{
        id: 129,
        timestamp: '2017-07-21T11:45:47.591Z',
        subject: 'Flagged question',
        from: 'Abbie Hayes',
    }, {
        id: 128,
        timestamp: '2017-07-21T11:44:59.627Z',
        subject: 'Information About Survey',
        from: 'Mae Lamb',
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
    }, {
        id: 63,
        timestamp: '2017-06-21T11:37:51.348Z',
        subject: 'Blast From The Past',
        from: '',
    }],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.USER_DASH_SET_SEARCH_QUERY:
        return update(state, { ui: {
            searchQuery: { $set: action.searchQuery },
        } });
    case actionTypes.USER_DASH_SET_FILTER:
        return update(state, { ui: {
            filter: { $apply: filter =>
                (filter === action.filter ? FILTERS.ALL_TASKS : action.filter) },
        } });
    default:
        return state;
    }
};
