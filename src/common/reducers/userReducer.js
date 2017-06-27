import update from 'immutability-helper';
import * as actionTypes from '../actionTypes/userActionTypes';

const initialState = {
    id: 0,
    name: 'Super Mario',
    users: [{
        id: 0,
        firstName: 'Tyler',
        lastName: 'Durden',
        email: 't.durden@visa.com',
        activationDate: '1/1/2016',
    }, {
        id: 1,
        firstName: 'Robert',
        lastName: 'Paulson',
        email: 'bobbyp@dove.com',
        invited: true,
    }, {
        id: 2,
        firstName: 'John',
        lastName: 'McClane',
        email: 'johnm@nypd.gov',
        title: 'Detective Lieutenant',
    }, {
        id: 3,
        firstName: 'Ellen',
        lastName: 'Ripley',
        email: 'believeit@snopes.com',
    }, {
        id: 4,
        firstName: 'Indiana',
        lastName: 'Jones',
        email: 'digem@cmu.edu',
    }, {
        id: 5,
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'FeMan@stark.com',
    }, {
        id: 6,
        firstName: 'Johnny',
        lastName: 'Quest',
        email: 'john@gmail.com',
    }, {
        id: 7,
        firstName: 'Buck',
        lastName: 'Rogers',
        email: 'thebuckster@americanradgas.com',
    }, {
        id: 8,
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
    default:
        return state;
    }
};
