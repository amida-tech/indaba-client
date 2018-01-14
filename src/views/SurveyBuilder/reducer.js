import update from 'immutability-helper';
import { assign, cloneDeep, omit } from 'lodash';
import { toast } from 'react-toastify';

import * as type from './actionTypes';
import {
    GET_SURVEY_BY_ID_SUCCESS,
    POST_SURVEY_SUCCESS,
    PATCH_SURVEY_SUCCESS,
 } from '../../common/actionTypes/surveyActionTypes';

export const initialState = {
    ui: {
        sectionView: -1,
    },
    form: {
        name: '',
        description: '',
        status: 'draft',
        sections: [],
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
    case POST_SURVEY_SUCCESS:
        return update(state, { form: { id: { $set: action.survey.id },
            sections: { $set: [{ name: '', questions: [] }] } } });
    case PATCH_SURVEY_SUCCESS: // Not sure I want forceStatus coming back.
        return update(state, { form: { $merge: action.survey } });
    case type.SURVEY_BUILDER_CHANGE_SECTION_VIEW:
        return update(state, { ui: { sectionView: { $set: action.sectionView } } });
    case type.SURVEY_BUILDER_UPDATE_INSTRUCTIONS:
        return update(state, { form: { description: { $set: action.instructions } } });
    case type.SURVEY_BUILDER_INSERT_SECTION:
        return update(state, { form: { sections: { $push:
            [{ name: '', questions: [] }] } } });
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
                { $merge: action.value } } },
                $unset: ['id'] } } } });
        }
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { [action.field]:
            { $set: action.value },
            $unset: ['id'] } } } } } });
    }
    case type.SURVEY_BUILDER_UPSERT_CHOICE: {
        if (action.value !== undefined) {
            return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { [action.questionIndex]: { choices: {
                $apply: choices => choices.map(choice => omit(choice, ['id'])),
                [action.choiceIndex]: { text: { $set: action.value } } },
                $unset: ['id'] } } } } } });
        }
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { choices: {
            $apply: choices => choices.map(choice => omit(choice, ['id'])),
            $splice: [[action.choiceIndex + 1, 0, { text: '' }]] } } },
            $unset: ['id'] } } } });
    }
    case type.SURVEY_BUILDER_DELETE_CHOICE:
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { choices: { $splice:
            [[action.choiceIndex, 1]] } } } } } } });
    case type.SURVEY_BUILDER_DELETE_QUESTION:
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $splice: [[action.questionIndex, 1]] } } } } });
    case type.SURVEY_BUILDER_MOVE_QUESTION: {
        if (action.questionIndex === 0 && action.move < 0) {
            toast(action.errorMessages.ALREADY_TOP);
            return state;
        }
        if ((action.questionIndex + action.move) ===
            state.form.sections[action.sectionIndex].questions.length) {
            toast(action.errorMessages.ALREADY_BOTTOM);
            return state;
        }
        const tempArray = cloneDeep(state.form.sections[action.sectionIndex].questions);
        const tempQuestion = tempArray[action.questionIndex + action.move];
        tempArray[action.questionIndex + action.move] = tempArray[action.questionIndex];
        tempArray[action.questionIndex] = tempQuestion;
        return update(state, { form: { sections: { [action.sectionIndex]:
            { questions: { $set: tempArray } } } } });
    }
    case type.SURVEY_BUILDER_RESET_META:
        return update(state, { form: { sections: { [action.sectionIndex]:
        { questions: { [action.questionIndex]: { meta:
            { $unset: [action.field] } } } } } } });
    default:
        return state;
    }
};
