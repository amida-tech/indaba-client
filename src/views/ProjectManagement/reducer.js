import update from 'immutability-helper';
import * as t from './actionTypes';

export const initialState = {
    navigation: {
        subnav: 'workflow',
    },
    projects: [{
        id: 0,
        workflow: {
            id: 0,
            name: 'Pizza Lovers Anonymous',
            status: 'Active',
            stages: [{
                id: 0,
                title: 'Fill Out The Survey',
                startStage: '1/1/2017',
                endStage: '2/1/2017',
                userGroups: ['Researchers'],
                permissions: 0,
            }, {
                id: 1,
                title: 'First Review',
                startStage: '3/3/2017',
                endStage: '4/3/2017',
                userGroups: ['Managers', 'Researchers'],
                permissions: 2,
            }, {
                id: 2,
                title: 'Second Review',
                startStage: '4/4/2017',
                endStage: '5/3/2017',
                userGroups: ['Managers'],
                permissions: 2,
            }, {
                id: 3,
                title: 'Third Review',
                startStage: '5/4/2017',
                endStage: '6/3/2017',
                userGroups: ['Managers'],
                permissions: 2,
            }],
            roles: ['Researchers', 'Managers'],
            subjects: ['Berlin', 'Chicago', 'K\'unlun'],
            assignees: [{
                id: 0,
                name: 'Jon McLane',
                role: 0,
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
                id: 1,
                name: 'Ellen Ripley',
                role: 0,
                stage: 0,
                subject: 1,
                response: [{
                    id: 0,
                    value: true,
                    flag: true,
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
                }],
            }, {
                id: 2,
                name: 'Indiana Jones',
                role: 1,
                stage: 1,
                subject: 0,
                dueDate: '9/9/2017',
                response: [{
                    id: 0,
                    value: true,
                    flag: true,
                    review: false,
                    comment: 'What was the question?',
                }, {
                    questionId: 1,
                    value: 0,
                    review: true,
                }],
            }, {
                id: 3,
                name: 'Tony Stark',
                role: 1,
                stage: 1,
                subject: 2,
            }],
            unassigned: [{
                id: 4,
                name: 'Johnny Quest',
                role: 0,
            }, {
                id: 5,
                name: 'Buck Rogers',
                role: 0,
            }, {
                id: 6,
                name: 'Marvin Martian',
                role: 1,
            }],
        },
        survey: {
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
        },
    }],
};

export default (state = initialState, action) => {
    let projectIndex;
    if (action.projectId !== undefined) {
        projectIndex = state.projects.findIndex(p => p.id === action.projectId);
    }
    switch (action.type) {
    case t.ASSIGN_TASK:
        return update(state, { projects: { [projectIndex]: {
            workflow: {
                assignees: { $push: [action.payload] },
                unassigned: { $apply: u => u.filter(un => un.id !== action.payload.id) } } } } });
    case t.SUBNAVIGATE:
        return update(state, { navigation: { subnav: { $set: action.id } } });
    case t.TOGGLE_FILTER:
        return update(state, { projects: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } } });
    case t.ADD_SUBJECT:
        return update(state, { projects: { [projectIndex]: { workflow: {
            subjects: { $push: [action.subject] },
        } } } });
    case t.ADD_STAGE:
        return update(state, { projects: { [projectIndex]: { workflow: {
            stages: { $push: [update(action.stage, { $merge: {
                id: state.projects[projectIndex].workflow.stages.length } })] },
        } } } });
    case t.UPDATE_TASK:
        return Object.assign({}, state);
    case t.SET_PROJECT_STATUS:
        return update(state, { projects: { [projectIndex]: { workflow: {
            status: { $set: action.status },
        } } } });
    case t.SET_SURVEY_STATUS:
        return update(state, { projects: { [projectIndex]: { survey: {
            status: { $set: action.status },
        } } } });
    default:
        return state;
    }
};
