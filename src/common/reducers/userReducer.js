import en from '../../i18n/en';

const initialState = {
    id: 0,
    name: 'Super Mario',
    users: [{
        id: 0,
        firstName: 'Tyler',
        lastName: 'Durden',
        permissions: 4,
    }, {
        id: 1,
        firstName: 'Robert',
        lastName: 'Paulson',
        permissions: 0,
    }, {
        id: 2,
        firstName: 'Jon',
        lastName: 'McLane',
        permissions: 0,
    }, {
        id: 3,
        firstName: 'Ellen',
        lastName: 'Ripley',
        permissions: 0,
    }, {
        id: 4,
        firstName: 'Indiana',
        lastName: 'Jones',
        permissions: 0,
    }, {
        id: 5,
        firstName: 'Tony',
        lastName: 'Stark',
        permissions: 0,
    }, {
        id: 6,
        firstName: 'Johnny',
        lastName: 'Quest',
        permissions: 0,
    }, {
        id: 7,
        firstName: 'Buck',
        lastName: 'Rogers',
        permissions: 0,
    }, {
        id: 8,
        firstName: 'Marvin',
        lastName: 'Martian',
        permissions: 0,
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
