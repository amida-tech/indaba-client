import update from 'immutability-helper';
import { flatten, map, filter, findIndex, intersectionWith } from 'lodash';

import * as type from './actionTypes';
import { UPDATE_FLAGGED_QUESTION } from '../../common/actionTypes/discussActionTypes';
import { GET_ANSWERS_SUCCESS, GET_SURVEY_BY_ID_SUCCESS, POST_ANSWER_SUCCESS } from '../../common/actionTypes/surveyActionTypes';

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
    case type.STORE_FLAGGED_ISSUES:
        return update(state,
            { ui: { flags: { $set: action.flags } } });
    case type.UPDATE_QUESTION_DISPLAY:
        return update(state, { ui: { showQuestions: { $set: action.questionArray } } });
    case type.SET_ACTIVE_FLAG:
        return update(state,
            { ui: { flagSidebar: {
                activeId: { $set: action.activeId },
                timestamp: { $set: action.timestamp },
            } } });
    case type.UPDATE_MARK_RESOLVED:
        return update(state,
            { ui: { flagSidebar: { resolved: { $set: action.resolved } } } });
    case UPDATE_FLAGGED_QUESTION: {
        const flagIndex = findIndex(state.ui.flags, flag =>
            flag.id === action.activeId);
        if (action.data.resolved) {
            let nextId = 0; // Determines the next active question, if any.
            if (flagIndex === 0 && state.ui.flags.length > 1) {
                nextId = state.ui.flags[1].id;
            } else if (flagIndex > 0) {
                nextId = state.ui.flags[0].id;
            }
            return update(state, { ui: {
                flags: { $splice: [[flagIndex, 1]] },
                flagSidebar: {
                    activeId: { $set: nextId },
                    comment: { $set: '' },
                    resolved: { $set: false },
                } } });
        }
        return update(state, { ui: {
            flags: { [flagIndex]: { flagHistory: { $push: [{
                timestamp: action.data.timestamp,
                comment: action.data.comment,
            }] } } },
            flagSidebar: {
                comment: { $set: '' },
                resolved: { $set: false },
            } } });
    }
    default:
        return state;
    }
};
