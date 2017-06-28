import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/surveysActionTypes';

const initialState = [
    {
        id: 78,
        projectId: 101, // Think the Indaba backend maps the projectId in each survey
        name: 'How much do you like pizza?',
        instructions: 'Don\'t order with pineapple.',
        status: 'Published',
        description: 'If you don\'t like pizza, what are you doing here.',
        questions: [{
            id: 17,
            question: 'Have you ever had pizza?',
            type: 'Checkbox',
        }, {
            id: 21,
            question: 'Which topping on a supreme do you like the least?',
            type: 'MultipleChoice', // TODO: Consider giving key value against an enum.
            answers: [
                'Sausage',
                'Pepperoni',
                'Onions',
                'Green Peppers',
                'Olives'],
        }, {
            id: 18,
            question: 'How many toppings do you normally get?',
            type: 'Number',
        }, {
            id: 23,
            question: 'Tell us your favorite pizza experience.',
            type: 'LongText',
        }, {
            id: 34,
            question: 'Which toppings do you like? (Click all that apply.)',
            type: 'Checkbox',
            answers: [
                'Sausage',
                'Pepperoni',
                'Onions',
                'Green Peppers',
                'Olives'],
        }], // Still need to add Bulletpoint and scale
    },
];

export const SurveysReducer = (state = initialState, action) => {
    const surveyIndex = _.findIndex(state, survey => survey.projectId === action.projectId);
    switch (action.type) {
    case type.SET_SURVEY_STATUS:
        return update(state, { [surveyIndex]: { status: { $set: action.status } } });
    default:
        return state;
    }
};
