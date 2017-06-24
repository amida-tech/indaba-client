import update from 'immutability-helper';
import * as type from '../actionTypes/surveysActionTypes';
import _ from 'lodash';

const initialState = [
    {
		id: 0,
        projectId: 0, // Think the Indaba backend maps the projectId in each survey
		name: 'How much do you like pizza?',
		instructions: 'Don\'t order with pineapple.',
		status: 'Published',
		description: 'If you don\'t like pizza, what are you doing here.',
		questions: [{
			id: 0,
			question: 'Have you ever had pizza?',
			type: 'Checkbox',
		}, {
			id: 1,
			question: 'Which topping on a supreme do you like the least?',
			type: 'MultipleChoice', // TODO: Consider giving key value against an enum.
			answers: [
				'Sausage',
				'Pepperoni',
				'Onions',
				'Green Peppers',
				'Olives'],
		}, {
			id: 2,
			question: 'How many toppings do you normally get?',
			type: 'Number',
		}, {
			id: 3,
			question: 'Tell us your favorite pizza experience.',
			type: 'LongText',
		}, {
			id: 4,
			question: 'Which toppings do you like? (Click all that apply.)',
			type: 'Checkbox',
			answers: [
				'Sausage',
				'Pepperoni',
				'Onions',
				'Green Peppers',
				'Olives'],
		}], // Still need to add Bulletpoint and scale
	}
];

export const SurveysReducer = (state = initialState, action) => {
    const surveyIndex = _.findIndex(state, (survey) => survey.projectId === action.projectId);
    switch(action.type) {
        case type.SET_SURVEY_STATUS:
            return update(state, { [surveyIndex]: { status: { $set: action.status } } });
        default:
            return state;
    }
};
