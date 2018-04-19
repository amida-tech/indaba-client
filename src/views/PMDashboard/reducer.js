import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { GET_PROJECTS_SUCCESS } from '../../common/actionTypes/projectActionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_PROJECTS,
        noData: false,
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
        return update(state, { ui: { searchQuery: { $set: action.searchQuery } } });
    case GET_PROJECTS_SUCCESS:
        return update(state, { ui: { noData: { $set: (action.projects.length === 0) } } });
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
