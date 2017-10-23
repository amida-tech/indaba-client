import update from 'immutability-helper';
import _ from 'lodash';
import * as type from '../actionTypes/surveyActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
    },
    data: [{
        id: 0,
        projectId: 0,
        name: '',
        status: 0,
        question: [],
    }],
};

export const SurveysReducer = (state = initialState, action) => {
    const surveyIndex = _.findIndex(state, survey => survey.projectId === action.projectId);
    switch (action.type) {
    case type.SET_SURVEY_STATUS:
        return update(state, { [surveyIndex]: { status: { $set: action.status } } });
    case type.SET_SURVEY_NAME:
        return update(state, { [surveyIndex]: {
            name: { $set: action.name },
        } });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
