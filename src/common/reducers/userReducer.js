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
    profile: {
        id: 7,
        firstName: 'Super',
        lastName: 'Mario',
    },
    users: [{
        id: 13,
        firstName: 'Tyler',
        lastName: 'Durden',
        email: 't.durden@visa.com',
        activationDate: '1/1/2016',
    }, {
        id: 71,
        firstName: 'Robert',
        lastName: 'Paulson',
        email: 'bobbyp@dove.com',
        invited: true,
    }, {
        id: 22,
        firstName: 'John',
        lastName: 'McClane',
        email: 'johnm@nypd.gov',
        title: 'Detective Lieutenant',
    }, {
        id: 31,
        firstName: 'Ellen',
        lastName: 'Ripley',
        email: 'believeit@snopes.com',
    }, {
        id: 41,
        firstName: 'Indiana',
        lastName: 'Jones',
        email: 'digem@cmu.edu',
    }, {
        id: 25,
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'FeMan@stark.com',
    }, {
        id: 66,
        firstName: 'Johnny',
        lastName: 'Quest',
        email: 'john@gmail.com',
    }, {
        id: 87,
        firstName: 'Buck',
        lastName: 'Rogers',
        email: 'thebuckster@americanradgas.com',
    }, {
        id: 98,
        firstName: 'Marvin',
        lastName: 'Martian',
        email: 'bleepblorp@mars.com',
    }],
};

export const UserReducer = (state = initialState, action) => {
    const userIndex = state.users.findIndex(user => user.id === action.userId);
    switch (action.type) {
    case actionTypes.SET_USER_FIRST_NAME:
        return update(state, { users: { [userIndex]: { firstName: { $set: action.firstName } } } });
    case actionTypes.SET_USER_LAST_NAME:
        return update(state, { users: { [userIndex]: { lastName: { $set: action.lastName } } } });
    case actionTypes.SET_USER_EMAIL:
        return update(state, { users: { [userIndex]: { email: { $set: action.email } } } });
    case actionTypes.SET_USER_TITLE:
        return update(state, { users: { [userIndex]: { title: { $set: action.title } } } });
    case actionTypes.ADD_NEW_USER:
        return update(state, { users: { $push: [action.user] } });
    case actionTypes.UPDATE_USER:
        return update(state, { users: { [userIndex]: { $merge: action.user } } });
    default:
        return state;
    }
};
