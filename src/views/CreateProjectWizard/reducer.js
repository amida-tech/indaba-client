import update from 'immutability-helper';
import * as t from './actionTypes';

const initialState = {
    workflow: {
        status: 'Inactive',
        stages: [],
    },
    survey: {
        status: 'Draft',
    },
    users: [0, 1],
    userGroups: [{
        id: 0,
        name: 'great',
        users: [0, 1],
    }],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_WIZARD_PROJECT_TITLE:
        return update(state, { workflow: { name: { $set: action.title } } });
    case t.ADD_SUBJECTS_TO_WIZARD:
        return update(state, { workflow:
            { subjects: { $set: [...(state.workflow.subjects || []), ...action.subjects] } } });
    case t.DELETE_SUBJECT_FROM_WIZARD:
        return update(state, { subjects: { workflow:
            { $splice: [[state.workflow.subjects.indexOf(action.subject), 1]] } } });
    case t.ADD_USER_TO_WIZARD:
        return update(state, { users: { $push: [action.user.id] } });
    case t.REMOVE_USER_FROM_WIZARD:
        return update(state, { users:
            { $splice: [[state.users.indexOf(action.userId), 1]] } });
    case t.ADD_USER_GROUP_TO_WIZARD:
        return update(state, {
            userGroups: {
                $push: [update(action.group, { id: { $set: state.userGroups.length } })],
            },
        });
    case t.REMOVE_USER_GROUP_FROM_WIZARD:
        return update(state, {
            userGroups: {
                $set: state.userGroups.filter(group => group.id !== action.id),
            },
        });
    case t.ADD_STAGE_TO_WIZARD:
        return update(state, { workflow: {
            stages: { $push: [update(action.stage, {
                id: { $set: state.workflow.stages.length } })] },
        } });
    default:
        return state;
    }
};
