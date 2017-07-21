import update from 'immutability-helper';
import _ from 'lodash';
import * as type from '../actionTypes/surveysActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';

const initialState = [
    {
        id: 78,
        projectId: 101, // Think the Indaba backend maps the projectId in each survey
        name: 'Farmer\'s Market Difficulties',
        instructions: 'Please indicate whether you agree or disagree with the importance of the following questions, and flag any questions with obvious errors.',
        status: 'Published',
        description: 'Causes of business difficulty in gaining access to market forums.',
        questions: [{
            id: 17,
            question: 'Have you ever tried to host a stall at a market?',
            type: 'Checkbox',
        }, {
            id: 21,
            question: 'Which of the following describes your biggest concern when selecting a farmer\'s market?',
            type: 'MultipleChoice', // TODO: Consider giving key value against an enum.
            answers: [
                'Location of Market',
                'Fees Associated with Forum',
                'Setup Challenges',
                'Sales Limitations/Regulations',
                'Crime/Theft'],
        }, {
            id: 18,
            question: 'What is the average number of sales you make a week?',
            type: 'Number',
        }, {
            id: 23,
            question: 'Describe your most recent challenges.',
            type: 'LongText',
        }, {
            id: 34,
            question: 'Which describes the goods you sell at the market?',
            type: 'MultipleChoice',
            answers: [
                'Produce',
                'Meats',
                'Preservatives',
                'Services',
                'Other'],
        }, {
            id: 99,
            question: 'Tell us your best market experience.',
            type: 'LongText',
        }, {
            id: 98,
            question: 'How many thefts do you deal with per week?',
            type: 'Number',
        }, {
            id: 104,
            question: 'Which describes your business\' great strength?',
            type: 'MultipleChoice',
            answers: [
                'Low Cost',
                'High Quality',
                'Adaptability to Consumer Needs',
                'Customer Service',
                'Other'],
        }, {
            id: 117,
            question: 'What is your income per week?',
            type: 'Number',
        }, {
            id: 209,
            question: 'Do you have a second job or source of income?',
            type: 'Checkbox',
        }], // Still need to add Bulletpoint and scale
    },
];

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
