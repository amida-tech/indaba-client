import * as actionTypes from './actionTypes';
import apiService from '../../services/api';

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

export function pmDashGetMessages() {
    return (dispatch) => {
        apiService.messaging.list((err, response) => {
            if (err) {
                dispatch(_getMessagesFailure());
            } else {
                dispatch(_getMessagesSuccess(response));
            }
        }, {
            limit: 4,
        });
    };
}

function _getMessagesFailure(err) {
    return {
        type: actionTypes.PM_DASH_GET_MESSAGES_FAILURE,
        err,
    };
}

function _getMessagesSuccess(messages) {
    return {
        type: actionTypes.PM_DASH_GET_MESSAGES_SUCCESS,
        messages,
    };
}
