import en from '../../i18n/en';

const initialState = {
    currentId: 0,
    users: [{
        id: 0,
        name: 'Tyler Durden',
        userGroup: 1,
    }, {
        id: 1,
        name: 'Robert Paulson',
        userGroup: 0,
    },{
        id: 2,
        name: 'Jon McLane',
        userGroup: 0,
    },{
        id: 3,
        name: 'Ellen Ripley',
        userGroup: 0,
    },{
        id: 4,
        name: 'Indiana Jones',
        userGroup: 0,
    },{
        id: 5,
        name: 'Tony Stark',
        userGroup: 0,
    },{
        id: 6,
        name: 'Johnny Quest',
        userGroup: 1,
    }, {
        id: 7,
        name: 'Buck Rogers',
        userGroup: 0,
    }, {
        id: 8,
        name: 'Marvin Martian',
        userGroup: 1,
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
