import update from 'immutability-helper';

import * as type from '../actionTypes/userActionTypes';
import { LOG_OUT } from '../actionTypes/navActionTypes';

export const constants = {
    notifications: {
        OFF: 0,
        INTERNAL: 1,
        EMAIL: 2,
    },

    status: {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE',
    },
};

const initialState = {
    ui: {
        errorMessage: '',
    },
    profile: {
        id: null,
        firstName: '',
        email: '',
        lastName: '',
        organizationId: null,
    },
    users: [],
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
    case type.PUT_PROFILE_SUCCESS:
        return update(state, { profile: { $merge: action.profile } });
    case type.POST_NEW_USER_SUCCESS:
        return update(state, { users: { $push: [action.user] } });
    case type.NOTIFY_USER:
        return state;
    case type.GET_PROFILE_SUCCESS:
        return update(state, { profile: { $set: action.profile } });
    case type.GET_USERS_SUCCESS:
        return update(state, { users: { $set: action.users } });
    case type.REPORT_USER_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    case type.DELETE_USER_SUCCESS: {
        const userIndex = state.users.findIndex(user => user.id === action.userId);
        return update(state, { users: { $splice: [[userIndex, 1]] } });
    }
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
