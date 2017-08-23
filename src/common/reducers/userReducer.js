import update from 'immutability-helper';
import * as actionTypes from '../actionTypes/userActionTypes';

export const constants = {
    notifications: {
        OFF: 'OFF',
        INTERNAL: 'INTERNAL',
        EMAIL: 'EMAIL',
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
        id: 31,
        firstName: 'Super',
        lastName: 'Mario',
        organizationId: 2,
    },
    users: [],
    // [{
    //     id: 13,
    //     firstName: 'Tyler',
    //     lastName: 'Durden',
    //     email: 't.durden@visa.com',
    //     activationDate: '1/1/2016',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.INACTIVE,
    // }, {
    //     id: 71,
    //     firstName: 'Robert',
    //     lastName: 'Paulson',
    //     email: 'bobbyp@dove.com',
    //     invited: true,
    //     notifications: constants.notifications.INTERNAL,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 22,
    //     firstName: 'John',
    //     lastName: 'McClane',
    //     email: 'johnm@nypd.gov',
    //     title: 'Detective Lieutenant',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 31,
    //     firstName: 'Ellen',
    //     lastName: 'Ripley',
    //     email: 'believeit@snopes.com',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 41,
    //     firstName: 'Indiana',
    //     lastName: 'Jones',
    //     email: 'digem@cmu.edu',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 25,
    //     firstName: 'Tony',
    //     lastName: 'Stark',
    //     email: 'FeMan@stark.com',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 66,
    //     firstName: 'Johnny',
    //     lastName: 'Quest',
    //     email: 'john@gmail.com',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 87,
    //     firstName: 'Buck',
    //     lastName: 'Rogers',
    //     email: 'thebuckster@americanradgas.com',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }, {
    //     id: 98,
    //     firstName: 'Marvin',
    //     lastName: 'Martian',
    //     email: 'bleepblorp@mars.com',
    //     notifications: constants.notifications.OFF,
    //     status: constants.status.ACTIVE,
    // }],
};

export const UserReducer = (state = initialState, action) => {
    const userIndex = state.users.findIndex(user => user.id === action.userId);
    // Strongly consider clearing error message here after every call?
    switch (action.type) {
    case actionTypes.SET_USER_FIRST_NAME:
        return update(state, { users: { [userIndex]: { firstName: { $set: action.firstName } } } });
    case actionTypes.SET_USER_LAST_NAME:
        return update(state, { users: { [userIndex]: { lastName: { $set: action.lastName } } } });
    case actionTypes.SET_USER_EMAIL:
        return update(state, { users: { [userIndex]: { email: { $set: action.email } } } });
    case actionTypes.SET_USER_TITLE:
        return update(state, { users: { [userIndex]: { title: { $set: action.title } } } });
    case actionTypes.POST_NEW_USER_SUCCESS:
        return update(state, { users: { $push: [action.user] } });
    case actionTypes.UPDATE_USER:
        return update(state, { users: { [userIndex]: { $merge: action.user } } });
    case actionTypes.NOTIFY_USER:
        return state;
    case actionTypes.GET_PROFILE_SUCCESS:
        return update(state, { profile: { $set: action.profile } });
    case actionTypes.GET_USERS_SUCCESS:
        return update(state, { users: { $set: action.users } });
    case actionTypes.REPORT_USER_ERROR:
        return update(state, { ui: { errorMessage: { $set: action.error } } });
    default:
        return state;
    }
};
