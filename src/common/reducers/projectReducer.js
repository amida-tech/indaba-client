import update from 'immutability-helper';
import _ from 'lodash';

import * as type from '../actionTypes/projectActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';
import { POST_NEW_USER_SUCCESS } from '../actionTypes/userActionTypes';

const initialState = {
    ui: {
        errorMessage: '',
        showStage: false,
        editStage: null,
        showAddSubject: false,
    },
    data: [{
        id: -1,
        name: '',
        status: 0,
        productId: 0,
        workflowId: 0,
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
    case type.POST_PROJECT_SUCCESS:
        return state.data[0].name ?
        update(state, { data: { $push: [action.project] } }) :
        update(state, { data: { $set: [action.project] } });
    case type.PUT_PROJECT_SUCCESS:
        return update(state, { data: { [projectIndex]: { $merge: action.project } } });
    case type.SHOW_STAGE_MODAL:
        return update(state, { ui: {
            showStage: { $set: action.show },
            editStage: { $set: action.stageId !== undefined ? action.stageId : null },
        } });
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
    case type.UPDATE_PROJECT_WITH_SURVEY:
        return update(state, { data: { [projectIndex]: { surveyId: { $set: action.surveyId } } } });
    case type.TOGGLE_FILTER:
        return update(state, { data: { [projectIndex]: {
            filter: { $apply: f => (f !== action.filter ? action.filter : '') } } } });
    case type.SET_PROJECT_STATUS:
        return update(state, { data: { [projectIndex]: { status: { $set: action.status } } } });
    case type.PUT_STAGE_SUCCESS: {
        const stageIndex = _.findIndex(state.data[projectIndex].stages,
            stage => stage.id === action.stage.id);
        if (stageIndex >= 0) {
            return update(state, { data: { [projectIndex]: {
                stages: { [stageIndex]: { $set: action.stage } },
            } } });
        }
        return update(state, { data: { [projectIndex]: {
            stages: { $push: [action.stage] },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    }
    case type.POST_SUBJECT_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            subjects: { $set: _.concat(state.data[projectIndex].subjects, action.subjects) },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.DELETE_SUBJECT_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            subjects: { $apply: ss => ss.filter(subject => subject.id !== action.uoaId) },
            lastUpdated: { $set: new Date().toISOString() },
        } } });
    case type.POST_PROJECT_USER_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            users: { $push: [action.userId] } } } });
    case type.DELETE_PROJECT_USER_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            users: { $apply: users => users.filter(user => user !== action.userId),
            } } } });
    case type.DELETE_USER_GROUP:
        return update(state, { data: { [projectIndex]: {
            userGroups: { $apply: userGroups =>
                        userGroups.filter(userGroup => userGroup.id !== action.groupId),
            } } } });
    case type.ADD_USER_GROUP:
        return update(state, { data: { [projectIndex]: {
            userGroups: { $push: [action.group] } } } });
    case type.UPDATE_USER_GROUP:
        groupIndex = state[projectIndex].userGroups
                    .findIndex(group => group.id === action.group.id);
        return update(state, { data: { [projectIndex]: { userGroups: {
            [groupIndex]: { $set: action.group },
        } } } });
    case POST_NEW_USER_SUCCESS:
        return update(state, { data: { [projectIndex]: {
            users: { $push: [action.user.id] },
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
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
