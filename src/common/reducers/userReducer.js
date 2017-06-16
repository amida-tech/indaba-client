import en from '../../i18n/en';

const initialState = {
    currentId: 0,
    users: [{
        id: 0,
        name: 'Tyler Durden',
        permissions: 4,
    }, {
        id: 1,
        name: 'Robert Paulson',
        permissions: 0,
    },{
        id: 2,
        name: 'Jon McLane',
        permissions: 0,
    },{
        id: 3,
        name: 'Ellen Ripley',
        permissions: 0,
    },{
        id: 4,
        name: 'Indiana Jones',
        permissions: 0,
    },{
        id: 5,
        name: 'Tony Stark',
        permissions: 0,
    },{
        id: 6,
        name: 'Johnny Quest',
        permissions: 0,
    }, {
        id: 7,
        name: 'Buck Rogers',
        permissions: 0,
    }, {
        id: 8,
        name: 'Marvin Martian',
        permissions: 0,
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
