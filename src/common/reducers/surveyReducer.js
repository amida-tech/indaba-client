import update from 'immutability-helper';
import { findIndex, get } from 'lodash';
import * as type from '../actionTypes/surveyActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
        newSurveyName: '',
        sectionIndex: -1,
    },
    data: [{
        id: -1,
        projectId: 0,
        name: '',
        status: 'draft',
        questions: [],
    }],
};

export const SurveyReducer = (state = initialState, action) => {
    const surveyIndex = findIndex(state.data, survey => survey.id === action.surveyId);
    switch (action.type) {
    case type.POST_SURVEY_SUCCESS:
        return update(state, { data: { $push: [action.survey] }, ui: { newSurveyName: { $set: '' } } });
    case type.PATCH_SURVEY_SUCCESS:
        return update(state, { data: { [surveyIndex]: { $merge: action.survey } } });
    case type.GET_SURVEYS_SUCCESS:
        return update(state, { data: { $set: action.surveys } });
    case type.GET_SURVEY_BY_ID_SUCCESS:
        return (!state.data[0].name
            ? update(state, { data: { $set: [action.survey] } })
            : update(state, { data: { [surveyIndex]: { $merge: action.survey } } }));
    case type.SET_SURVEY_SECTION_INDEX:
        return update(state, { ui: { sectionIndex: { $set: action.index } } });
    case type.REPORT_SURVEY_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.errorMessage } } });
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
