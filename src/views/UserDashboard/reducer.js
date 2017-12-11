import update from 'immutability-helper';
import { unionBy } from 'lodash';

import * as actionTypes from './actionTypes';
import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_TASKS,
    },
    messages: [],
    tasks: [],
    answers: [],
    surveys: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.USER_DASH_SET_SEARCH_QUERY:
        return update(state, { ui: {
            searchQuery: { $set: action.searchQuery },
        } });
    case actionTypes.USER_DASH_SET_FILTER:
        return update(state, { ui: {
            filter: { $apply: filter =>
                (filter === action.filter ? FILTERS.ALL_TASKS : action.filter) },
        } });
    case actionTypes.USER_DASH_GET_MESSAGES_SUCCESS:
        return update(state, {
            messages: { $set: action.messages },
        });
    case actionTypes.USER_DASH_GET_TASKS_SUCCESS:
        return update(state, {
            tasks: { $set: action.tasks },
        });
    case actionTypes.USER_DASH_GET_ANSWERS_SUCCESS:
        return update(state, {
            answers: answers => unionBy(answers, [action.answers], 'assessmentId'),
        });
    case actionTypes.USER_DASH_GET_SURVEY_BY_ID_SUCCESS:
        return update(state, {
            surveys: surveys => unionBy(surveys, [action.survey], 'id'),
        });
    default:
        return state;
    }
};
