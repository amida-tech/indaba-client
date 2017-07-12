import update from 'immutability-helper';
import * as type from './actionTypes';

const initialState = {
    ui: {
        projectTitle: {
            show: true,
        },
        step: 0,
        complete: false,
    },
    project: {
        id: 41,
        name: '',
        status: 'Inactive',
        users: [],
        stages: [],
        userGroups: [],
        subjects: [],
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
    case type.SET_WIZARD_PROJECT_TITLE:
        return update(state, { ui: { projectTitle: { show: { $set: false } } } });
    case type.ADD_SUBJECTS_TO_WIZARD:
        return update(state, { project:
            { subjects: { $set: [...(state.project.subjects || []), ...action.subjects] } } });
    case type.DELETE_SUBJECT_FROM_WIZARD:
        return update(state, { project: { subjects:
            { $splice: [[state.project.subjects.indexOf(action.subject), 1]] } } });
    case type.ADD_USER_TO_WIZARD:
        return update(state, { project: { users: { $push: [action.user.id] } } });
    case type.REMOVE_USER_FROM_WIZARD:
        return update(state, { project: { users:
            { $splice: [[state.project.users.indexOf(action.userId), 1]] } } });
    case type.ADD_USER_GROUP_TO_WIZARD:
        return update(state, { project: {
            userGroups: {
                $push: [update(action.userGroup, {
                    id: { $set: state.project.userGroups.length } })] },
        } });
    case type.REMOVE_USER_GROUP_FROM_WIZARD:
        return update(state, { project: {
            userGroups: {
                $set: state.project.userGroups.filter(group => group.id !== action.id),
            } },
        });
    case type.ADD_STAGE_TO_WIZARD:
        return update(state, { project: {
            stages: { $push: [update(action.stage, {
                id: { $set: state.project.stages.length } })] },
        } });
    case type.ADD_PROJECT_FROM_WIZARD:
        return initialState;
    case type.GO_TO_STEP:
        return update(state, { ui: {
            step: { $set: action.step },
        } });
    case type.COMPLETE_WIZARD:
        return update(state, { ui: {
            complete: { $set: true },
        } });
    default:
        return state;
    }
};
