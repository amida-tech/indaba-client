import update from 'immutability-helper';
import _ from 'lodash';
import * as type from '../actionTypes/surveyActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
        newSurveyName: '',
    },
    data: [{
        id: 0,
        projectId: 0,
        name: '',
        status: 'draft',
        sections: [],
    }],
};

export const SurveyReducer = (state = initialState, action) => {
    const surveyIndex = _.findIndex(state.data, survey => survey.id === action.surveyId);
    switch (action.type) {
    case type.POST_SURVEY_SUCCESS:
        return state.data[0].name ?
            update(state, { data: { $push: [action.survey] }, ui: { newSurveyName: '' } }) :
            update(state, { data: { $set: [action.survey] }, ui: { newSurveyName: '' } });
    case type.PATCH_SURVEY_SUCCESS:
        return update(state, { data: { [surveyIndex]: { $merge: action.survey } } });
    case type.GET_SURVEYS_SUCCESS:
        return (!state.data[0].name ?
            update(state, { data: { $set: action.surveys } }) :
            update(state, { data: { $merge: action.surveys } }));
    case type.GET_SURVEY_BY_ID_SUCCESS:
        return (!state.data[0].name ?
            update(state, { data: { $set: [action.survey] } }) :
            update(state, { data: { [surveyIndex]: { $merge: action.survey } } }));
    case type.SET_SURVEY_STATUS:
        return update(state, { data: { [surveyIndex]: { status: { $set: action.status } } } });
    case type.SET_SURVEY_NAME: {
        return (surveyIndex > 0 ?
            update(state, { data: { [surveyIndex]: { name: { $set: action.name } } } }) :
            update(state, { ui: { newSurveyName: { $set: action.name } } }));
    }
    case type.REPORT_SURVEY_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
