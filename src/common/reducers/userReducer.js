import en from '../../i18n/en';

const initialState = {
    id: 0,
    name: 'Super Mario',
    users: [{
        id: 0,
        firstName: 'Tyler',
        lastName: 'Durden',
    }, {
        id: 1,
        firstName: 'Robert',
        lastName: 'Paulson',
    }, {
        id: 2,
        firstName: 'Jon',
        lastName: 'McLane',
    }, {
        id: 3,
        firstName: 'Ellen',
        lastName: 'Ripley',
    }, {
        id: 4,
        firstName: 'Indiana',
        lastName: 'Jones',
    }, {
        id: 5,
        firstName: 'Tony',
        lastName: 'Stark',
    }, {
        id: 6,
        firstName: 'Johnny',
        lastName: 'Quest',
    }, {
        id: 7,
        firstName: 'Buck',
        lastName: 'Rogers',
    }, {
        id: 8,
        firstName: 'Marvin',
        lastName: 'Martian',
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
