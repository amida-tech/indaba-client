import en from '../../i18n/en';

const initialState = {
    currentId: 0,
    users: [{
        id: 0,
        name: 'Tyler Durden',
    }, {
        id: 1,
        name: 'Robert Paulson',
    },{
        id: 2,
        name: 'Jon McLane',
    },{
        id: 3,
        name: 'Ellen Ripley',
    },{
        id: 4,
        name: 'Indiana Jones',
    },{
        id: 5,
        name: 'Tony Stark',
    },{
        id: 6,
        name: 'Johnny Quest',
    }, {
        id: 7,
        name: 'Buck Rogers',
    }, {
        id: 8,
        name: 'Marvin Martian',
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
