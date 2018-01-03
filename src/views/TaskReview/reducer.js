import update from 'immutability-helper';
import { flatten, map, filter, findIndex, intersectionWith } from 'lodash';

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
        reqTotal: -1,
        reqAnswers: 0,
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
        let flatSurvey = action.survey.sections ? flatten(map(action.survey.sections, 'questions')) :
            action.survey.questions;
        let reqQuestions;
        if (flatSurvey[0] === undefined) {
            flatSurvey = [];
            reqQuestions = [];
        } else {
            reqQuestions = filter(flatSurvey, question => question.required);
        }
        const flatAnswers = map(state.ui.form.answers, item =>
            ({ questionId: item.questionId, answer: item.answer }));
        const answers = intersectionWith(reqQuestions, flatAnswers,
            (q, a) => q.id === a.questionId);
        const setActive = flatSurvey.length > 0 ? flatSurvey[0].id : -1;
        return update(state, { ui: {
            flagSidebar: { activeId: { $set: setActive }, timestamp: { $set: new Date() } },
            form: { surveyId: { $set: action.surveyId } },
            reqTotal: { $set: reqQuestions.length },
            reqAnswers: { $set: answers.length },
        } });
    }
    case GET_ANSWERS_SUCCESS:
        return update(state, { ui: { reqAnswers: { $set: 0 },
            form: { answers: { $set: action.answers } } } });
    case POST_ANSWER_SUCCESS: {
        const answerIndex = findIndex(state.ui.form.answers,
            answer => answer.questionId === action.questionId);
        const reqIncrease = answerIndex < 0 && action.required ?
            state.ui.reqAnswers + 1 : state.ui.reqAnswers;
        return answerIndex < 0 ?
            update(state, { ui: { reqAnswers: { $set: reqIncrease },
                lastSave: { $set: Date.now() },
                form: { answers: {
                    $push: [{ questionId: action.questionId, answer: action.answer }],
                } } } }) :
            update(state, { ui: { reqAnswers: { $set: reqIncrease },
                lastSave: { $set: Date.now() },
                form: { answers: { [answerIndex]: { answer: { $set: action.answer } } } } } });
    }
    case type.GET_DISCUSSIONS_SUCCESS:
        return update(state, { ui: { flags: { $set: action.discussions } } });
    case type.UPDATE_QUESTION_DISPLAY:
        return update(state, { ui: { showQuestions: { $set: action.questionArray } } });
    case type.SET_ACTIVE_FLAG:
        return update(state,
            { ui: { flagSidebar: { activeId: { $set: action.activeId },
                timestamp: { $set: action.timestamp },
            } } });
    case type.UPDATE_MARK_RESOLVED:
        return update(state,
            { ui: { flagSidebar: { resolved: { $set: action.resolved } } } });
    default:
        return state;
    }
};
