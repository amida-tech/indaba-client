import update from 'immutability-helper';
import { compact, flatten, get, has, map, findIndex } from 'lodash';

import * as type from './actionTypes';
import {
    GET_ANSWERS_SUCCESS,
    GET_SURVEY_BY_ID_SUCCESS,
    POST_ANSWER_SUCCESS } from '../../common/actionTypes/surveyActionTypes';

export const initialState = {
    ui: {
        flags: [],
        showQuestions: [],
        flagSidebar: {
            activeId: -1, // Id of flag above.
            comment: '',
            resolved: false,
            timestamp: null,
        },
        lastSave: null,
        form: {
            surveyId: -1,
            answers: [],
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_SURVEY_BY_ID_SUCCESS: {
        let flatSurvey = [];
        if (has(action.survey, 'questions')) {
            flatSurvey = get(action.survey, 'questions', []);
        } else if (has(action.survey, 'sections')) {
            flatSurvey = compact(flatten(map(action.survey.sections, 'questions')));
        }
        const setActive = flatSurvey.length > 0 ? flatSurvey[0].id : -1;
        return update(state, { ui: { flagSidebar: { activeId: { $set: setActive },
            timestamp: { $set: new Date() } },
            form: { surveyId: { $set: action.surveyId } },
        } });
    }
    case GET_ANSWERS_SUCCESS:
        return update(state, { ui: { form: { answers: { $set: action.answers } } } });
    case type.HOLD_ANSWER: {
        const answerIndex = findIndex(state.ui.form.answers,
            answer => answer.questionId === action.questionId);
        if (answerIndex === -1) {
            return update(state, { ui: { form: { answers: { $push:
                [{ questionId: action.questionId, answer: action.answer }],
            } } } });
        }
        return update(state, { ui: { form: { answers: { [answerIndex]: { answer:
            { $set: action.answer } } } } } });
    }
    case POST_ANSWER_SUCCESS: {
        const answerIndex = findIndex(state.ui.form.answers,
            answer => answer.questionId === action.questionId);
        const result = has(action, 'meta') ?
            { questionId: action.questionId, answer: action.answer, meta: action.meta } :
            { questionId: action.questionId, answer: action.answer };
        return answerIndex < 0 ?
            update(state, { ui: { lastSave: { $set: Date.now() },
                form: { answers: {
                    $push: [result],
                } } } }) :
            update(state, { ui: { lastSave: { $set: Date.now() },
                form: { answers: { [answerIndex]: { $merge: result } } } } });
    }
    case type.GET_DISCUSSIONS_SUCCESS:
        return update(state, { ui: { flags: { $set: action.discussions } } });
    case type.UPDATE_QUESTION_DISPLAY:
        return update(state, { ui: { showQuestions: { $set: action.questionArray } } });
    case type.SET_ACTIVE_FLAG:
        return update(state, { ui: { flagSidebar: { activeId: { $set: action.activeId },
            timestamp: { $set: action.timestamp } } } });
    case type.UPDATE_MARK_RESOLVED:
        return update(state,
            { ui: { flagSidebar: { resolved: { $set: action.resolved } } } });
    default:
        return state;
    }
};
