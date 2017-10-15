import update from 'immutability-helper';
import * as type from './actionTypes';
import { POST_PROJECT_SUCCESS, REPORT_PROJECT_ERROR }
    from '../../common/actionTypes/projectActionTypes';
import { REPORT_USER_ERROR } from '../../common/actionTypes/userActionTypes';

const initialState = {
    ui: {
        showProjectTitle: true,
        showAddStage: false,
        step: 0,
        showComplete: true,
        addUsers: {
            tab: 0,
            showSelectGroupUsers: false,
            usersFilter: '',
            groupsFilter: '',
        },
        errorMessage: '',
        projectLink: -1,
    },
    project: {
        id: 0,
        name: 'blah',
        status: 0,
        productId: 0,
        workflowId: 0,
        users: [],
        stages: [],
        userGroups: [],
        subjects: [],
    },
    survey: {
        id: 0,
        projectId: 0,
        status: 0,
        questions: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.PROJECT_WIZARD_INITIALIZE:
        return initialState;
    case type.UPDATE_WIZARD_PROJECT_TITLE:
        return update(state, { project: { name: { $set: action.title } } });
    case type.UPDATE_WIZARD_PROJECT_SUMMARY:
        return update(state, { project: { summary: { $set: action.summary } } });
    case POST_PROJECT_SUCCESS:
        return update(state,
            { ui: {
                showProjectTitle: { $set: false },
                projectLink: { $set: action.project.id },
                errorMessage: { $set: '' } } });
    case type.SHOW_ADD_STAGE_WIZARD_MODAL:
        return update(state, { ui: { showAddStage: { $set: action.show } } });
    case type.SHOW_ADD_USER_GROUP_WIZARD_MODAL:
        return update(state, { ui: { addUsers: {
            showSelectGroupUsers: { $set: action.show },
        } } });
    case type.GO_TO_STEP:
        return update(state, { ui: { step: { $set: action.step } } });
    case type.SHOW_COMPLETE_WIZARD:
        return update(state, { ui: { showComplete: { $set: action.show } } });
    case type.ADD_USERS_SET_TAB:
        return update(state, { ui: { addUsers: { tab: { $set: action.tab } } } });
    case type.ADD_USERS_SET_USERS_FILTER:
        return update(state, { ui: { addUsers: { usersFilter: { $set: action.filter } } } });
    case type.ADD_USERS_SET_GROUPS_FILTER:
        return update(state, { ui: { addUsers: { groupsFilter: { $set: action.filter } } } });
    case REPORT_PROJECT_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case REPORT_USER_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    default:
        return state;
    }
};
