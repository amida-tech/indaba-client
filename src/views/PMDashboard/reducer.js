import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_PROJECTS,
        names: [{
            projectId: 101,
            projectName: 'Home Business Study',
            surveyName: 'Farmer\'s Market Difficulties',
        }],
    },
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PM_DASH_SET_SEARCH_QUERY:
        return update(state, { ui: {
            searchQuery: { $set: action.searchQuery },
        } });
    case actionTypes.PM_DASH_SET_FILTER:
        return update(state, { ui: { filter: { $set: action.filter } } });
    case actionTypes.PM_DASH_GET_MESSAGES_SUCCESS:
        return update(state, {
            messages: { $set: action.messages.messages },
        });
    default:
        return state;
    }
};
