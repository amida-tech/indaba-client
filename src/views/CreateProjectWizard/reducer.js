import update from 'immutability-helper';
import * as type from './actionTypes';
import { POST_PROJECT_SUCCESS, REPORT_PROJECT_ERROR }
    from '../../common/actionTypes/projectActionTypes';
import { REPORT_USER_ERROR } from '../../common/actionTypes/userActionTypes';

const initialState = {
    ui: {
        message: '',
        isError: false,
        showProjectTitle: true,
        showAddStage: false,
        stageEditId: null,
        step: 0,
        showComplete: false,
        addUsers: {
            tab: 0,
            showSelectGroupUsers: false,
            usersFilter: '',
        },
        projectLink: -1,
        showSubjectDeleteConfirmModal: null,
        showStageDeleteConfirmModal: null,
        showProjectTitleModal: false,
        showSurveyTitleModal: false,
    },
    project: {
        id: 0,
        name: '',
        status: 0,
        productId: 0,
        workflowId: 0,
        users: [],
        stages: [],
        userGroups: [],
        subjects: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.PROJECT_WIZARD_INITIALIZE:
        return initialState;
    case POST_PROJECT_SUCCESS:
        return update(state,
            {
                ui: {
                    showProjectTitle: { $set: false },
                    projectLink: { $set: action.project.id },
                    message: { $set: '' },
                    isError: { $set: false },
                },
            });
    case type.WIZARD_SHOW_STAGE_MODAL: {
        if (action.show) {
            return update(state, {
                ui: {
                    showAddStage: { $set: true },
                    stageEditId: { $set: action.stageId },
                },
            });
        }
        return update(state, {
            ui: {
                showAddStage: { $set: false },
                stageEditId: { $set: action.stageId },
            },
        });
    }
    case type.SHOW_ADD_USER_GROUP_WIZARD_MODAL:
        return update(state, {
            ui: {
                addUsers: {
                    showSelectGroupUsers: { $set: action.show },
                },
            },
        });
    case type.WIZARD_SHOW_SUBJECT_DELETE_CONFIRM_MODAL:
        return update(state, {
            ui: {
                showSubjectDeleteConfirmModal: {
                    $set: {
                        id: action.id,
                        deleteType: action.deleteType,
                    },
                },
            },
        });
    case type.WIZARD_HIDE_SUBJECT_DELETE_CONFIRM_MODAL:
        return update(state, {
            ui: {
                showSubjectDeleteConfirmModal: { $set: null },
            },
        });
    case type.GO_TO_STEP:
        return update(state, { ui: { step: { $set: action.step } } });
    case type.SHOW_COMPLETE_WIZARD:
        return update(state, { ui: { showComplete: { $set: action.show } } });
    case type.ADD_USERS_SET_TAB:
        return update(state, { ui: { addUsers: { tab: { $set: action.tab } } } });
    case type.ADD_USERS_SET_USERS_FILTER:
        return update(state, { ui: { addUsers: { usersFilter: { $set: action.filter } } } });
    case type.WIZARD_UI_MESSAGE:
        return update(state, { ui: {
            message: { $set: action.errorMessage },
            isError: { $set: action.isError },
        } });
    case REPORT_PROJECT_ERROR:
        return update(state, { ui: {
            message: { $set: action.errorMessage },
            isError: { $set: true },
        } });
    case REPORT_USER_ERROR:
        return update(state, { ui: {
            message: { $set: action.errorMessage },
            isError: { $set: true },
        } });
    case type.WIZARD_SHOW_STAGE_DELETE_CONFIRM_MODAL: {
        return update(state, {
            ui: {
                showStageDeleteConfirmModal: {
                    $set: {
                        stageId: action.stageId,
                    },
                },
            },
        });
    }
    case type.WIZARD_HIDE_STAGE_DELETE_CONFIRM_MODAL: {
        return update(state, {
            ui: {
                showStageDeleteConfirmModal: { $set: null },
            },
        });
    }
    case type.WIZARD_SHOW_PROJECT_TITLE_MODAL:
        return update(state, {
            ui: {
                showProjectTitleModal: { $set: true },
            },
        });
    case type.WIZARD_HIDE_PROJECT_TITLE_MODAL:
        return update(state, {
            ui: {
                showProjectTitleModal: { $set: false },
            },
        });
    case type.WIZARD_SHOW_SURVEY_TITLE_MODAL:
        return update(state, {
            ui: {
                showSurveyTitleModal: { $set: true },
            },
        });
    case type.WIZARD_HIDE_SURVEY_TITLE_MODAL:
        return update(state, {
            ui: {
                showSurveyTitleModal: { $set: false },
            },
        });
    default:
        return state;
    }
};
