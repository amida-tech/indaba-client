import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_PROJECTS,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.USER_DASH_SET_SEARCH_QUERY:
        return update(state, { ui: {
            searchQuery: { $set: action.searchQuery },
        } });
    case actionTypes.USER_DASH_SET_FILTER:
        return update(state, { ui: {
            filter: { $set: action.filter },
        } });
    default:
        return state;
    }
};
