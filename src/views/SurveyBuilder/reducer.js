import update from 'immutability-helper';
import { assign } from 'lodash';

import * as type from './actionTypes';
import { PATCH_SURVEY_SUCCESS, GET_SURVEY_BY_ID_SUCCESS } from '../../common/actionTypes/surveyActionTypes';

export const initialState = {
    ui: {
        sectionView: 0,
    },
    form: {
        name: '',
        description: '',
        status: 'draft',
        sections: [{
            name: '',
            questions: [],
        }],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_SURVEY_BY_ID_SUCCESS: {
        if (action.survey.id) {
            if (action.survey.questions) {
                const newSurvey = assign({}, action.survey, { sections: [
                    { name: '', questions: action.survey.questions }] });
                delete newSurvey.questions;
                return update(state, { form: { $set: newSurvey } });
            }
            return update(state, { form: { $set: action.survey } });
        }
        return initialState;
    }
    case PATCH_SURVEY_SUCCESS:
        return update(state, { form: { $set: action.survey } });
    case type.SURVEY_BUILDER_UPDATE_INSTRUCTIONS:
        return update(state, { form: { description: { $set: action.instructions } } });
    case type.SURVEY_BUILDER_INSERT_SECTION:
        return update(state, { form: { sections: { $push:
            [{ name: (action.tempName + state.form.sections.length), questions: [] }] } } });
    case type.SURVEY_BUILDER_UPDATE_SECTION:
        return update(state, { form: { sections: { [action.sectionIndex]:
            { name: { $set: action.name } } } } });
    case type.SURVEY_BUILDER_INSERT_QUESTION:
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $push: [action.question] } } } } });
    case type.SURVEY_BUILDER_UPDATE_QUESTION:
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { [action.questionIndex]: { $set: action.question } } } } } });
    default:
        return state;
    }
};
