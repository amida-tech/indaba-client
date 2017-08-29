import update from 'immutability-helper';
import _ from 'lodash';
import * as type from '../actionTypes/surveysActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';

const initialState = {
    ui: {
        errorMessage: '',
    },
    data: [{
        id: 0,
        projectId: 0,
        name: '',
        status: 0,
        question: [],
    }],
};

// const initialState = [
//     {
//         id: 78,
//         projectId: 101, // Think the Indaba backend maps the projectId in each survey
//         name: 'Farmer\'s Market Difficulties',
//         instructions: 'Please indicate whether you agree or ',
//         status: 'Published',
//         description: 'Causes of business difficulty in gaining access to market forums.',
//         questions: [{
//             id: 17,
//             question: 'Have you ever tried to host a stall at a market?',
//             type: 'Checkbox',
//         }, {
//             id: 21,
//             question: 'Which of the folla farmer\'s market?',
//             type: 'MultipleChoice', // TODO: Consider giving key value against an enum.
//             answers: [
//                 'Location of Market',
//                 'Fees Associated with Forum',
//                 'Setup Challenges',
//                 'Sales Limitations/Regulations',
//                 'Crime/Theft'],
//         }, {
//             id: 18,
//             question: 'What is the average number of sales you make a week?',
//             type: 'Number',
//         }, {
//             id: 23,
//             question: 'Describe your most recent challenges.',
//             type: 'LongText',
//         }, {
//             id: 34,
//             question: 'Which describes the goods you sell at the market?',
//             type: 'MultipleChoice',
//             answers: [
//                 'Produce',
//                 'Meats',
//                 'Preservatives',
//                 'Services',
//                 'Other'],
//         }, {
//             id: 99,
//             question: 'Tell us your best market experience.',
//             type: 'LongText',
//         }, {
//             id: 98,
//             question: 'How many thefts do you deal with per week?',
//             type: 'Number',
//         }, {
//             id: 104,
//             question: 'Which describes your business\' great strength?',
//             type: 'MultipleChoice',
//             answers: [
//                 'Low Cost',
//                 'High Quality',
//                 'Adaptability to Consumer Needs',
//                 'Customer Service',
//                 'Other'],
//         }, {
//             id: 117,
//             question: 'What is your income per week?',
//             type: 'Number',
//         }, {
//             id: 209,
//             question: 'Do you have a second job or source of income?',
//             type: 'Checkbox',
//         }], // Still need to add Bulletpoint and scale
//     },
//     {
//         id: 79,
//         projectId: 102,
//         name: 'Midterm Stakeholder Survey',
//         instructions: 'Please ie follrors.',
//         status: 'Draft',
//         description: 'Stakeholder satisfaction survey',
//         questions: [{
//             id: 17,
//             question: 'Are you satisfied as a stakeholder?',
//             type: 'Checkbox',
//         }, {
//             id: 21,
//             question: 'Which of the following words would you use to describe our services',
//             type: 'MultipleChoice',
//             answers: [
//                 'Reliable',
//                 'High Quality',
//                 'Useful',
//                 'Poor quality',
//                 'Unreliable'],
//         }, {
//             id: 18,
//             question: 'How long have you been a Partner/Stakeholder?',
//             type: 'Number',
//         }, {
//             id: 23,
//             question: 'Describe your most recent challenges.',
//             type: 'LongText',
//         }, {
//             id: 34,
//             question: 'Overall, how satisfied or dissatisfied are you with the agency',
//             type: 'MultipleChoice',
//             answers: [
//                 'Very Satisfied',
//                 'Somewhat Satisfied',
//                 'Neither Satisfied nor dissatisfied',
//                 'Somewhat dissatisfied',
//                 'Very dissatisfied'],
//         }, {
//             id: 99,
//             question: 'Do you have any other commits, questions, or concerns.',
//             type: 'LongText',
//         }],
//     },
// ];

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
