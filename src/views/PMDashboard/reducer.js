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
