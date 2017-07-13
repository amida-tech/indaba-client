import * as actionTypes from './actionTypes';

export function setSearchQuery(searchQuery) {
    return {
        type: actionTypes.PM_DASH_SET_SEARCH_QUERY,
        searchQuery,
    };
}

export function setFilter(filter) {
    return {
        type: actionTypes.PM_DASH_SET_FILTER,
        filter,
    };
}
