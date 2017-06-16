import update from 'immutability-helper';
import * as t from './actionTypes';
import { ADD_PROJECT_FROM_WIZARD } from './../CreateProjectWizard/actionTypes';

export const initialState = {
    navigation: {
        subnav: 'workflow',
    },
    surveys: [{
		id: 0,
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
		}, {
			id: 5,
			question: 'Which toppings do you like the most?',
			type: 'Dropdown',
			answers: [
				'Sausage',
				'Pepperoni',
				'Onions',
				'Green Peppers',
				'Olives'],
		}], // Still need to add Bulletpoint and scale
	}],
	projects: [{
		id: 0,
		name: 'Pizza Lovers Anonymous',
		status: 'Active',
		surveyId: 0, // Associated survey.
		stages: [{
			id: 0,
			title: 'Fill Out The Survey',
			startStage: '1/1/2017',
			endStage: '2/1/2017',
			userGroups: [0],
			permissions: 0,
		}, {
			id: 1,
			title: 'First Review',
			startStage: '3/3/2017',
			endStage: '4/3/2017',
			userGroups: [0, 1],
			permissions: 2,
		}, {
			id: 2,
			title: 'Second Review',
			startStage: '4/4/2017',
			endStage: '5/3/2017',
			userGroups: [1],
			permissions: 2,
		}, {
			id: 3,
			title: 'Third Review',
			startStage: '5/4/2017',
			endStage: '6/3/2017',
			userGroups: [1], //Index of userGroups
			permissions: 2,
		}], //stages end
		userGroups: ['Researchers', 'Managers'],
		subjects: ['Berlin', 'Chicago', 'K\'unlun'],
		tasks: [{ //Changed from assignees.
			id: 2,
			stage: 0,
			subject: 0,
			response: [{
				id: 0,
				value: false,
				review: true,
			}, {
				id: 1,
			}],
		}, {
			id: 3,
			stage: 0,
			subject: 1,
			response: [{
				id: 0,
				value: true,
				flag: true,
				flagHistory: [{
					timestamp: 'Sun Jun 11 2017 08:15:15 GMT-0400 (Eastern Daylight Time)',
					comment: 'YELLOW FLAG!',
					userId: 3,
				}, {
					timestamp: 'Mon Jun 12 2017 09:43:15 GMT-0400 (Eastern Daylight Time)',
					comment: 'Well too bad cupcake!',
					userId: 1,
				}],
				review: true,
			}, {
				id: 1,
				value: 1,
				review: false,
				comment: 'Gross topping.',
			}, {
				id: 2,
				value: 5,
				review: false,
				comment: 'So much food.',
			}, {
				id: 3,
				value: 'It was the best of pizza, it was the worst of pizza.',
				flag: true,
				flagHistory: [{
					timestamp: 'Wed Jun 14 2017 10:42:15 GMT-0400 (Eastern Daylight Time)',
					comment: 'I dislike this.',
					userId: 3,
				}],
				review: true,
			}, {
				id: 4,
				value: [0, 2],
				flag: true,
				flagHistory: [{
					timestamp: 'Tue Jun 13 2017 11:42:15 GMT-0400 (Eastern Daylight Time)',
					comment: 'I REALLY dislike this.',
					userId: 3,
				}],
				review: false,
				comment: 'Bad combo.',
			}],
		}, {
			id: 4,
			stage: 1,
			subject: 0,
			dueDate: '9/9/2017',
			response: [{
				id: 0,
				value: true,
				flag: true,
				flagHistory: [{
					timestamp: 'Mon Jun 12 2017 12:34:15 GMT-0400 (Eastern Daylight Time)',
					comment: 'I like flags.',
					userId: 2,
				}],
				review: false,
				comment: 'What was the question?',
			}, {
				questionId: 1,
				value: 0,
				review: true,
			}],
		}, {
			id: 5,
			stage: 1,
			subject: 2,
		}],
    }],
};

export default (state = initialState, action) => {
    let projectIndex;
    let findUser;

    if (action.projectId !== undefined) {
        projectIndex = state.projects.findIndex(p => p.id === action.projectId);
    }
    switch (action.type) {
    case t.ASSIGN_TASK:
        return update(state, { projects: { [projectIndex]: {
                assignees: { $push: [action.payload] },
                unassigned: { $apply: u => u.filter(un => un.id !== action.payload.id) } } } });
    case t.SUBNAVIGATE:
        return update(state, { navigation: { subnav: { $set: action.id } } });
    case t.TOGGLE_FILTER:
        return update(state, { projects: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } } });
    case t.ADD_SUBJECT:
        return update(state, { projects: { [projectIndex]: {
            subjects: { $push: [action.subject] },
        } } });
    case t.DELETE_SUBJECT:
        return update(state, { projects: { [projectIndex]: {
            subjects: { $apply: ss => ss.filter(s => s !== action.subject) },
        } } });
    case t.ADD_STAGE:
        return update(state, { projects: { [projectIndex]: {
            stages: { $push: [update(action.stage, { $merge: {
                id: state.projects[projectIndex].stages.length } })] },
        } } });
    case t.UPDATE_TASK:
        return Object.assign({}, state);
    case t.SET_PROJECT_STATUS:
        return update(state, { projects: { [projectIndex]: {
            status: { $set: action.status },
        } } });
    case t.SET_SURVEY_STATUS:
        return update(state, { projects: { [projectIndex]: { survey: {
            status: { $set: action.status },
        } } } });
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, {
            projects: { $push: [update(action.project, { $merge: {
                id: state.projects.length } })],
            } });
    default:
        return state;
    }
};
