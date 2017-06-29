import update from 'immutability-helper';
import uuidv1 from 'uuid/v1';

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
            reassignUser: null,
            task: {},
        },
    },
    projects: [{
        id: 101,
        name: 'Pizza Lovers Anonymous',
        status: 'Active',
        users: [13, 71, 41, 25, 22, 31],
        stages: [{
            id: 0,
            title: 'Fill Out The Survey',
            startStage: '1/1/2017',
            endStage: '2/1/2017',
            userGroups: [11],
            permissions: 0,
        }, {
            id: 1,
            title: 'First Review',
            startStage: '3/3/2017',
            endStage: '4/3/2017',
            userGroups: [11, 13],
            permissions: 2,
        }, {
            id: 2,
            title: 'Second Review',
            startStage: '4/4/2017',
            endStage: '5/3/2017',
            userGroups: [13],
            permissions: 2,
        }, {
            id: 3,
            title: 'Third Review',
            startStage: '5/4/2017',
            endStage: '6/3/2017',
            userGroups: [13], // Index of userGroups
            permissions: 2,
        }], // stages end
        userGroups: [
            {
                id: 11,
                name: 'Researchers',
                users: [41, 25, 22, 31],
            }, {
                id: 13,
                name: 'Managers',
                users: [13, 71],
            }],
        subjects: ['Berlin', 'Chicago', 'K\'unlun'],
    }],
};

export default (state = initialState, action) => {
    let projectIndex;
    let groupIndex;

    if (action.projectId !== undefined) {
        projectIndex = state.projects.findIndex(project =>
            project.id === action.projectId);
    }

    switch (action.type) {
    case type.SUBNAVIGATE: // ui related.
        return update(state, { ui: { subnav: { $set: action.id } } });
    case type.TOGGLE_FILTER:
        return update(state, { projects: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } } });
    case type.UPDATE_STATUS_CHANGE:
        return update(state, { ui: { statusModalId: { $set: action.status } } });
    case type.UPDATE_USER_SEARCH_GROUP:
        return (update(state, { ui: { userSidebarSearch: {
            group: { $set: action.group },
        } } }));
    case type.UPDATE_USER_SEARCH_QUERY:
        return update(state, { ui: { userSidebarSearch: {
            query: { $set: action.query } } } });
    case type.SHOW_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: true },
            task: { $set: action.task },
        } } });
    case type.CLOSE_TASK_OPTIONS_MODAL:
        return update(state, { ui: { taskOptions: {
            show: { $set: false },
            task: { $set: {} },
        } } });
    case type.UPDATE_TASK_OPTIONS_CHOICE:
        return update(state, { ui: { taskOptions: {
            choice: { $set: action.choice },
        } } });
    case type.UPDATE_TASK_OPTIONS_REASSIGN_USER:
        return update(state, { ui: { taskOptions: {
            reassignUser: { $set: action.reassignUser },
        } } });
    case type.UPDATE_TASK_OPTIONS_NOTIFY:
        return update(state, { ui: { taskOptions: {
            notify: { $set: action.notify },
        } } });
    case type.UPDATE_TASK_OPTIONS_MESSAGE:
        return update(state, { ui: { taskOptions: {
            message: { $set: action.message },
        } } });
    case type.SET_PROJECT_STATUS: // project related.
        return update(state, { projects: { [projectIndex]: {
            status: { $set: action.status },
        } } });
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
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, {
            projects: { $push: [update(action.project, { $merge: {
                id: state.projects.length } })],
            } });
    case type.DELETE_USER_GROUP:
        return update(state, { projects: { [projectIndex]: {
            userGroups: { $apply: userGroups =>
                    userGroups.filter(userGroup => userGroup.id !== action.groupId),
            } } } });
    case type.ADD_USER_GROUP:
        return update(state, { projects: { [projectIndex]: {
            userGroups: { $push: [update(action.group, { $merge: {
                id: state.projects[projectIndex].userGroups.length } })] },
        } } });
    case type.UPDATE_USER_GROUP:
        groupIndex = state.projects[projectIndex].userGroups
                .findIndex(group => group.id === action.group.id);
        return update(state, { projects: { [projectIndex]: { userGroups: {
            [groupIndex]: { $set: action.group },
        } } } });
    default:
        return state;
    }
};
