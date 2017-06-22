import en from '../../i18n/en';
import update from 'immutability-helper';
import * as type from '../actionTypes/uiActionTypes';

const initialState = {
    subnav: 'workflow',
    userSidebarSearch: {
        query: '',
        groups: {},
    },
};

export const UIReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SUBNAVIGATE:
            return update(state, { subnav: { $set: action.id } });
        case type.UPDATE_USER_SEARCH_GROUP:
            return update(state, { userSidebarSearch: {
                group: { $set: action.group },
            } } );
        case type.UPDATE_USER_SEARCH_QUERY:
            return update(state, { userSidebarSearch: {
                query: { $set: action.query } } } );
        default:
            return state;
    }
};
