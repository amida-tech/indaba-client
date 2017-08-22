import update from 'immutability-helper';
import _ from 'lodash';
import * as type from './actionTypes';
import { REPORT_USER_ERROR } from '../../common/actionTypes/userActionTypes';

const initialState = {
    ui: {
        showProjectTitle: true,
        showAddStage: false,
        step: 0,
        complete: false,
        addUsers: {
            tab: 0,
            showSelectGroupUsers: false,
            usersFilter: '',
            groupsFilter: '',
        },
        errorMessage: '',
        projectLink: 0,
    },
    project: {
        id: '',
        name: '',
        status: 'Inactive',
        productId: 0,
        users: [],
        stages: [],
        userGroups: [],
        subjects: [],
        workflowIds: [],
    },
    survey: {
        id: 8,
        projectId: 41,
        status: 'Draft',
        questions: [],
    },
    task: {
        projectId: 41,
        tasks: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.UPDATE_WIZARD_PROJECT_TITLE:
        return update(state, { project: { name: { $set: action.title } } });
    case type.UPDATE_WIZARD_PROJECT_SUMMARY:
        return update(state, { project: { summary: { $set: action.summary } } });
    case type.POST_PROJECT_WIZARD_SUCCESS:
        return update(state,
            { ui: {
                showProjectTitle: { $set: false },
                projectLink: { $set: action.id },
                errorMessage: { $set: '' } },
                project: {
                    id: { $set: action.id },
                    productId: { $set: action.productId },
                } });
    case type.POST_SUBJECTS_WIZARD_SUCCESS:
        return Array.isArray(action.subjects) ? // TODO Make always array later.
            update(state, { project: { subjects: {
                $set: _.union(state.project.subjects, action.subjects) } } }) :
            update(state, { project: { subjects: {
                $set: _.concat(state.project.subjects, action.subjects) } } });
    case type.POST_USER_WIZARD_SUCCESS:
        return state.project.users.includes(action.user.id) ?
        state : update(state, { project: { users: { $push: [action.user.id] } } });
    case type.POST_GROUP_WIZARD_SUCCESS:
        return update(state, { project: { userGroups: { $push: [action.group] } } });
    case type.POST_WORKFLOW_WIZARD_SUCCESS:
        return update(state, { project: { workflowIds: {
            $set: _.concat(state.project.workflowIds, action.workflowIds) } } });
    case type.PUT_STAGE_WIZARD_SUCCESS:
        return update(state, { project: { stages: { $push: [action.stage] } } });
    case type.SHOW_ADD_STAGE_WIZARD_MODAL:
        return update(state, { ui: { showAddStage: { $set: action.show } } });
    case type.SHOW_ADD_USER_GROUP_WIZARD_MODAL:
        return update(state, { ui: { addUsers: {
            showSelectGroupUsers: { $set: action.show },
        } } });
    case type.DELETE_SUBJECT_FROM_WIZARD:
        return update(state, { project: { subjects:
            { $splice: [[state.project.subjects.indexOf(action.subject), 1]] } } });
    case type.REMOVE_USER_FROM_WIZARD:
        return update(state, { project: { users:
            { $splice: [[state.project.users.indexOf(action.userId), 1]] } } });
    case type.REMOVE_USER_GROUP_FROM_WIZARD:
        return update(state, { project: {
            userGroups: {
                $set: state.project.userGroups.filter(group => group.id !== action.id),
            } },
        });
    case type.ADD_PROJECT_FROM_WIZARD:
        return update(initialState, { ui: { projectLink: { $set: state.ui.projectLink } } });
    case type.GO_TO_STEP:
        return update(state, { ui: { step: { $set: action.step } } });
    case type.COMPLETE_WIZARD:
        return update(state, { ui: { complete: { $set: true } } });
    case type.ADD_USERS_SET_TAB:
        return update(state, { ui: { addUsers: { tab: { $set: action.tab } } } });
    case type.ADD_USERS_SET_USERS_FILTER:
        return update(state, { ui: { addUsers: { usersFilter: { $set: action.filter } } } });
    case type.ADD_USERS_SET_GROUPS_FILTER:
        return update(state, { ui: { addUsers: { groupsFilter: { $set: action.filter } } } });
    case type.POST_PROJECT_WIZARD_FAILURE:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case type.POST_SUBJECTS_WIZARD_FAILURE:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case type.POST_GROUP_WIZARD_FAILURE:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case type.POST_WORKFLOW_WIZARD_FAILURE:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case type.PUT_STAGE_WIZARD_FAILURE:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case REPORT_USER_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    default:
        return state;
    }
};
