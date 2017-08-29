import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/projectActionTypes';
import { ADD_PROJECT_FROM_WIZARD } from '../../views/CreateProjectWizard/actionTypes';

const initialState = {
    ui: {
        errorMessage: '',
        showAddStage: false,
        showAddSubject: false,
    },
    data: [{
        name: '',
        status: 0,
        users: [],
        stages: [],
        userGroups: [],
        subjects: [],
    }],
};

export const ProjectReducer = (state = initialState, action) => {
    let projectIndex;
    let groupIndex;
    if (action.project !== undefined) {
        projectIndex = _.findIndex(state.data, project => project.id === action.project.id);
    } else if (action.projectId !== undefined) {
        projectIndex = _.findIndex(state.data, project => project.id === action.projectId);
    }

    switch (action.type) {
    case ADD_PROJECT_FROM_WIZARD:
        return update(state, { data: { $push: [action.wizard.project] } });
    case type.SHOW_ADD_STAGE_MODAL:
        return update(state, { ui: { showAddStage: { $set: action.show } } });
    case type.SHOW_ADD_SUBJECT_MODAL:
        return update(state, { ui: { showAddSubject: { $set: action.show } } });
    case type.GET_PROJECTS_SUCCESS:
        return (!state.data[0].name ?
            update(state, { data: { $set: action.projects } }) :
            update(state, { data: { $merge: action.projects } }));
    case type.GET_PROJECT_BY_ID_SUCCESS:
        return (!state.data[0].name ?
            update(state, { data: { $set: [action.project] } }) :
            update(state, { data: { [projectIndex]: { $merge: action.project } } }));
    case type.TOGGLE_FILTER:
        return update(state, { data: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter ? action.filter : '') } } } });
    case type.SET_PROJECT_STATUS: // project related.
        return update(state, { data: { [projectIndex]: { status: { $set: action.status } } } });
    case type.PUT_STAGE_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            stages: { $push: [action.stage] },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.POST_SUBJECT_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            subjects: { $push: [action.subject] },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.DELETE_SUBJECT:
        return update(state, { data: { [projectIndex]: {
            subjects: { $apply: ss => ss.filter(subject => subject !== action.subject) },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.DELETE_USER_GROUP:
        return update(state, { data: { [projectIndex]: {
            userGroups: { $apply: userGroups =>
                        userGroups.filter(userGroup => userGroup.id !== action.groupId),
            } } } });
    case type.ADD_USER_GROUP:
        return update(state, { data: { [projectIndex]: {
            userGroups: { $push: [update(action.group, { $merge: {
                id: state[projectIndex].userGroups.length } })] },
        } } });
    case type.UPDATE_USER_GROUP:
        groupIndex = state[projectIndex].userGroups
                    .findIndex(group => group.id === action.group.id);
        return update(state, { data: { [projectIndex]: { userGroups: {
            [groupIndex]: { $set: action.group },
        } } } });
    case type.ADD_USER:
        return update(state, { data: { [projectIndex]: {
            users: { $push: [action.userId] },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.REMOVE_USER:
        return update(state, { data: { [projectIndex]: {
            users: { $apply: users => users.filter(userId => userId !== action.userId) },
            userGroups: { $apply: userGroups => userGroups.map(userGroup => update(userGroup, {
                users: { $apply: users => users.filter(userId => userId !== action.userId) } })) },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.SET_PROJECT_NAME:
        return update(state, { data: { [projectIndex]: { name: { $set: action.name } } } });
    case type.REPORT_PROJECT_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    default:
        return state;
    }
};
