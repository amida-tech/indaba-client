import update from 'immutability-helper';
import _ from 'lodash';
import * as type from '../actionTypes/surveysActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';

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
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, { $push: [action.wizard.survey] });
    case type.SET_SURVEY_NAME:
        return update(state, { [surveyIndex]: {
            name: { $set: action.name },
        } });
    default:
        return state;
    }
};
