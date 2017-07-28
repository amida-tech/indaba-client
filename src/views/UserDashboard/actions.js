import * as actionTypes from './actionTypes';

export function setSearchQuery(searchQuery) {
    return {
        type: actionTypes.USER_DASH_SET_SEARCH_QUERY,
        searchQuery,
    };
}

export function setFilter(filter) {
    return {
        type: actionTypes.USER_DASH_SET_FILTER,
        filter,
    };
}
