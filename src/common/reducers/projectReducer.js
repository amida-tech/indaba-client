import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/projectActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';

const initialState = [{
    id: 101,
    name: 'Home Business Study',
    lastUpdated: '2017-06-10T16:28:13.877Z',
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
    subjects: ['Berlin', 'Chicago', 'Hong Kong'],
}, {
    id: 102,
    name: 'Midterm Project Evaluation',
    lastUpdated: '2017-07-20T16:28:13.877Z',
    status: 'Inactive',
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
        userGroups: [12, 14],
        permissions: 2,
    }, {
        id: 2,
        title: 'Second Review',
        startStage: '4/4/2017',
        endStage: '5/3/2017',
        userGroups: [13],
        permissions: 2,
    }], // stages end
    userGroups: [
        {
            id: 12,
            name: 'Researchers',
            users: [41, 25, 22, 31],
        }, {
            id: 14,
            name: 'Managers',
            users: [13, 71],
        }],
    subjects: ['Nigeria', 'China', 'Chicago'],
},
];

export const ProjectReducer = (state = initialState, action) => {
    let projectIndex;
    let groupIndex;

    if (action.projectId !== undefined) {
        projectIndex = _.findIndex(state, project => project.id === action.projectId);
    }

    switch (action.type) {
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, { $push: [action.wizard.project] });
    case type.TOGGLE_FILTER:
        return update(state, { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter) && action.filter } } });
    case type.SET_PROJECT_STATUS: // project related.
        return update(state, { [projectIndex]: {
            status: { $set: action.status },
        } });
    case type.ADD_SUBJECT:
        return state[projectIndex].subjects.includes(action.subject) ?
        state :
        update(state, { [projectIndex]: {
            subjects: { $push: [action.subject] },
            lastUpdated: { $set: new Date().toISOString() },
        } });
    case type.DELETE_SUBJECT:
        return update(state, { [projectIndex]: {
            subjects: { $apply: ss => ss.filter(subject => subject !== action.subject) },
            lastUpdated: { $set: new Date().toISOString() },
        } });
    case type.ADD_STAGE:
        return update(state, { [projectIndex]: {
            stages: { $push: [update(action.stage, { $merge: {
                id: state[projectIndex].stages.length } })] },
            lastUpdated: { $set: new Date().toISOString() },
        } });
    case type.DELETE_USER_GROUP:
        return update(state, { [projectIndex]: {
            userGroups: { $apply: userGroups =>
                        userGroups.filter(userGroup => userGroup.id !== action.groupId),
            } } });
    case type.ADD_USER_GROUP:
        return update(state, { [projectIndex]: {
            userGroups: { $push: [update(action.group, { $merge: {
                id: state[projectIndex].userGroups.length } })] },
        } });
    case type.UPDATE_USER_GROUP:
        groupIndex = state[projectIndex].userGroups
                    .findIndex(group => group.id === action.group.id);
        return update(state, { [projectIndex]: { userGroups: {
            [groupIndex]: { $set: action.group },
        } } });
    case type.ADD_USER:
        return update(state, { [projectIndex]: {
            users: { $push: [action.userId] },
            lastUpdated: { $set: new Date().toISOString() },
        } });
    case type.REMOVE_USER:
        return update(state, { [projectIndex]: {
            users: { $apply: users => users.filter(userId => userId !== action.userId) },
            userGroups: { $apply: userGroups => userGroups.map(userGroup => update(userGroup, {
                users: { $apply: users => users.filter(userId => userId !== action.userId) } })) },
            lastUpdated: { $set: new Date().toISOString() },
        } });
    case type.SET_PROJECT_NAME:
        return update(state, { [projectIndex]: {
            name: { $set: action.name },
        } });
    default:
        return state;
    }
};
