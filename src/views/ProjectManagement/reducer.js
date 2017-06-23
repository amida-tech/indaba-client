import update from 'immutability-helper';
import * as type from './actionTypes';
import { ADD_PROJECT_FROM_WIZARD } from './../CreateProjectWizard/actionTypes';

export const initialState = {
    ui: {
        subnav: 'workflow',
        userSidebarSearch: {
            query: '',
            groups: {},
        },
        statusModalId: false,
        taskOptions: {
            show: false,
            choice: null,
            notify: true,
            message: '',
            reassignId: null,
            task: {},
        },
    },
	projects: [{
		id: 0,
		name: 'Pizza Lovers Anonymous',
		status: 'Active',
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
		userGroups: [
            {
                id: 0,
                name: 'Researchers',
                users: [2,3],
            },{
                id: 1,
                name: 'Managers',
                users: [0,1],
            }],
		subjects: ['Berlin', 'Chicago', 'K\'unlun'],
		tasks: [{ //Changed from assignees.
            id: 0,
            userId: 2,
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
			userId: 3,
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
            id: 2,
			userId: 4,
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
            id: 3,
			userId: 5,
			stage: 1,
			subject: 2,
		}],
    }],
};

export default (state = initialState, action) => {
    let projectIndex;
    let findTask;

    if (action.projectId !== undefined) {
        projectIndex = state.projects.findIndex(project =>
            project.id === action.projectId);
    }

    switch (action.type) {
    case type.ASSIGN_TASK:
        return update(state, { projects: { [projectIndex]: {
                tasks: { $push: [action.payload] } } } });
    case type.SUBNAVIGATE:
        return update(state, { ui: { subnav: { $set: action.id } } });
    case type.TOGGLE_FILTER:
        return update(state, { projects: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } } });
    case type.ADD_SUBJECT:
        return update(state, { projects: { [projectIndex]: {
            subjects: { $push: [action.subject] },
        } } });
    case type.DELETE_SUBJECT:
        return update(state, { projects: { [projectIndex]: {
            subjects: { $apply: ss => ss.filter(subject => subject !== action.subject) },
        } } });
    case type.ADD_STAGE:
        return update(state, { projects: { [projectIndex]: {
            stages: { $push: [update(action.stage, { $merge: {
                id: state.projects[projectIndex].stages.length } })] },
        } } });
    case type.UPDATE_TASK:
        return Objectype.assign({}, state);
    case type.UPDATE_STATUS_CHANGE:
        return update(state, { ui: { statusModalId: { $set: action.status } } });
    case type.SET_PROJECT_STATUS:
        return update(state, { projects: { [projectIndex]: {
            status: { $set: action.status },
        } } });
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, {
            projects: { $push: [update(action.project, { $merge: {
                id: state.projects.length } })],
            } });
    case type.UPDATE_USER_SEARCH_GROUP:
        return(update(state, { ui: { userSidebarSearch: {
            group: { $set: action.group },
        } } } ) );
    case type.UPDATE_USER_SEARCH_QUERY:
        return update(state, { ui: { userSidebarSearch: {
            query: { $set: action.query } } } } );
    case type.UPDATE_TASK_DUE_DATE:
        findTask = state.projects[action.projectId]
            .tasks.findIndex(task =>
                (task.id === action.taskId));
        return update(state, { projects: { [action.projectId]:
        { tasks: { [findTask]:
				{ $merge: { dueDate: action.dueDate } } } } } });
    case type.UPDATE_FLAGGED_QUESTION:
        console.log(action.data);
        findTask = state.projects[action.data.projectId]
            .tasks.findIndex(task =>
                (task.id === action.data.assigneeId));
        return update(state, { projects: { [action.data.projectId]:
        { tasks: { [findTask]:
        { response: { [action.data.questionId]:
        { flag: { $set: !action.data.resolved },
            flagHistory: { $push: [{
                timestamp: action.data.timestamp,
                comment: action.data.comment,
                userId: action.data.signatureId,
            }] } } } } } } } });
    case type.SHOW_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: true },
            task: { $set: action.task },
        } } } );
    case type.CLOSE_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: false },
            task: { $set: {} },
        } } } );
    case type.UPDATE_TASK_OPTIONS_CHOICE:
        return update(state, { ui: { taskOptions: {
            choice: { $set: action.choice },
        } } } );
    case type.UPDATE_TASK_OPTIONS_REASSIGN_ID:
        return update(state, { ui: { taskOptions: {
            reassignId: { $set: action.reassignId },
        } } } );
    case type.UPDATE_TASK_OPTIONS_NOTIFY:
        return update(state, { ui: { taskOptions: {
            notify: { $set: action.notify },
        } } } );
    case type.UPDATE_TASK_OPTIONS_MESSAGE:
        return update(state, { ui: { taskOptions: {
            message: { $set: action.message },
        } } } );
    case type.SET_TASK_OPTIONS:
        // UPDATE LATER.
        return update(state, { ui: { taskOptions: {
            show: { $set: false },
            task: { $set: {} },
        } } } );
    default:
        return state;
    }
};
