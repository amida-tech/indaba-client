import update from 'immutability-helper';
import * as t from './actionTypes';

const initialState = {
    project: {
        status: 'Inactive',
        stages: [],
    },
    survey: {
        status: 'Draft',
    },
    users: [0, 1],
    userGroups: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_PROJECT_TITLE:
        return update(state, { project: { name: { $set: action.title } } });
    case t.ADD_SUBJECTS:
        return Object.assign({}, state,
            { subjects: [...(state.subjects || []), ...action.subjects] });
    case t.DELETE_SUBJECT:
        return update(state, { subjects:
            { $splice: [[state.subjects.indexOf(action.subject), 1]] } });
    case t.ADD_USER_TO_PROJECT:
        return update(state, { users: { $push: [action.user.id] } });
    case t.REMOVE_USER_FROM_PROJECT:
        return update(state, { users:
            { $splice: [[state.users.indexOf(action.userId), 1]] } });
    case t.ADD_USER_GROUP:
        return update(state, {
            userGroups: {
                $push: [update(action.group, { id: { $set: state.userGroups.length } })],
            },
        });
    case t.REMOVE_USER_GROUP:
        return update(state, {
            userGroups: {
                $set: state.userGroups.filter(group => group.id !== action.id),
            },
        });
    case t.ADD_STAGE:
        return update(state, { project: {
            stages: { $push: [action.stage] },
        } });
    default:
        return state;
    }
};
