import update from 'immutability-helper';

import * as actionTypes from './actionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_PROJECTS,
        nameChangeModal: false,
        names: [{
            projectId: 101,
            projectName: 'Home Business Study',
            surveyName: 'Farmer\'s Market Difficulties',
        }],
    },
};

export default (state = initialState, action) => {
    const projectId = state.ui.names.findIndex(nameData =>
        nameData.projectId === action.projectId);

    switch (action.type) {
    case actionTypes.PM_DASH_SET_SEARCH_QUERY:
        return update(state, { ui: {
            searchQuery: { $set: action.searchQuery },
        } });
    case actionTypes.PM_DASH_SET_FILTER:
        return update(state, { ui: { filter: { $set: action.filter } } });
    case actionTypes.PM_DASH_SET_PROJECT_NAME:
        return update(state, { ui: { names: { [projectId]: {
            projectName: { $set: action.name },
        } } } });
    case actionTypes.PM_DASH_SET_SURVEY_NAME:
        return update(state, { ui: { names: { [projectId]: {
            surveyName: { $set: action.name },
        } } } });
    case actionTypes.PM_DASH_SHOW_NAME_CHANGE:
        return update(state, { ui: {
            nameChangeModal: { $set: action.data },
        } });
    default:
        return state;
    }
};
