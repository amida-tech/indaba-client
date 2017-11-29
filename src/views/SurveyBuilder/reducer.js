import update from 'immutability-helper';
import { assign, cloneDeep } from 'lodash';
import { toast } from 'react-toastify';

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
    case type.SURVEY_BUILDER_UPDATE_QUESTION: {
        if (action.field === 'meta' && state.form.sections[action.sectionIndex].questions[action.questionIndex].meta) {
            return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { [action.questionIndex]: { [action.field]:
                { $merge: action.value } } } } } } });
        }
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { [action.field]:
            { $set: action.value } } } } } } });
    }
    case type.SURVEY_BUILDER_UPDATE_META:
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { meta: { [action.field]:
            { $merge: action.value } } } } } } } });
    case type.SURVEY_BUILDER_RESET_META:
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { meta:
            { $unset: [action.field] } } } } } } });
    case type.SURVEY_BUILDER_DELETE_QUESTION:
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $splice: [[action.questionIndex, 1]] } } } } });
    case type.SURVEY_BUILDER_MOVE_UP_QUESTION: {
        if (action.questionIndex === 0) {
            toast(action.errorMessages.ALREADY_TOP);
            return state;
        }
        const tempQuestionsArray = cloneDeep(state.form.sections[action.sectionIndex].questions);
        const tempQuestion = tempQuestionsArray[action.questionIndex - 1];
        tempQuestionsArray[action.questionIndex - 1] = tempQuestionsArray[action.questionIndex];
        tempQuestionsArray[action.questionIndex] = tempQuestion;
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $set: tempQuestionsArray } } } } });
    }
    case type.SURVEY_BUILDER_MOVE_DOWN_QUESTION: {
        if ((action.questionIndex + 1) ===
            state.form.sections[action.sectionIndex].questions.length) {
            toast(action.errorMessages.ALREADY_BOTTOM);
            return state;
        }
        const tempQuestionsArray = cloneDeep(state.form.sections[action.sectionIndex].questions);
        const tempQuestion = tempQuestionsArray[action.questionIndex + 1];
        tempQuestionsArray[action.questionIndex + 1] = tempQuestionsArray[action.questionIndex];
        tempQuestionsArray[action.questionIndex] = tempQuestion;
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $set: tempQuestionsArray } } } } });
    }
    default:
        return state;
    }
};
