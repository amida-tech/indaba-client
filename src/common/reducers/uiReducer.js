import en from '../../i18n/en';

const initialState = {
    subnav: 'workflow',
    userSidebarSearch: {
        query: '',
        groups: {},
    },
    // Look into Redux Forms
}

export const uiReducer = (state = initialState, action) => {
    case type.SUBNAVIGATE:
        return update(state, { ui: { subnav: { $set: action.id } } });
    case type.UPDATE_USER_SEARCH_GROUP:
        return(update(state, { ui: { userSidebarSearch: {
            group: { $set: action.group },
        } } } ) );
    case type.UPDATE_USER_SEARCH_QUERY:
        return update(state, { ui: { userSidebarSearch: {
            query: { $set: action.query } } } } );
    return state;
};
