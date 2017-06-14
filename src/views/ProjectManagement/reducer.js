import * as t from './actionTypes';
import update from 'immutability-helper';

export const initialState = {
    navigation: {
        subnav: 'workflow',
    },
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
            }, {
                id: 3,
                value: 'It was the best of pizza, it was the worst of pizza.',
                flag: true,
                review: true,
            }, {
                id: 4,
                value: [0,2],
                flag: true,
                review: false,
                comment: 'Bad combo.'
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
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.GET_WORKFLOW:
            return Object.assign({}, state, action.payload);
        case t.ASSIGN_TASK: // Remove from unassigned, add to assigned.
            var newState = Object.assign({}, state);
            newState.workflow.assignees.push(action.payload);
            var i = newState.workflow.unassigned.length;
            while (i--) {
                if (newState.workflow.unassigned[i].id === action.payload.id) {
                    newState.workflow.unassigned.splice(i, 1);
                    break;
                }
            }
            return newState;
        case t.UPDATE_WORKFLOW_PROJECT:
            return Object.assign({}, state, action.payload.project);
        case t.UPDATE_WORKFLOW_SURVEY:
            return Object.assign({}, state, action.payload.survey);
        case t.SUBNAVIGATE:
            return Object.assign({}, state, { navigation: { subnav: action.id } });
        case t.SHOW_MODAL_PROPS:
            return Object.assign({}, state,
            { navigation: Object.assign({}, state.navigation, { modal: action.id, modalData: action.props }) });
        case t.TOGGLE_FILTER:
            var newState = Object.assign({}, state);
            newState.workflow.filter =
            action.filter === newState.workflow.filter ? null : action.filter;
            return newState;
        case t.ADD_SUBJECT:
            var newState = Object.assign({}, state);
            newState.workflow.subjects.push(action.subject);
            delete newState.navigation.modal;
            return newState;
        case t.ADD_STAGE:
            var newState = Object.assign({}, state);
            newState.workflow.stages.push(action.stage);
            delete newState.navigation.modal;
            return newState;
        case t.UPDATE_TASK_DUE_DATE:
            return update(state, { workflow: { assignees: {[action.assigneeId]:
                    { $merge: { dueDate: action.dueDate } }}}});
        case t.SET_PROJECT_STATUS:
            return Object.assign({}, state,
            { workflow: Object.assign({}, state.workflow, { status: action.status }) },
            { navigation: Object.assign({}, state.navigation, { modal: null }) });
        case t.SET_SURVEY_STATUS:
            return Object.assign({}, state,
            { survey: Object.assign({}, state.survey, { status: action.status }) },
            { navigation: Object.assign({}, state.navigation, { modal: null }) });
        default:
            return state;
    }
};
