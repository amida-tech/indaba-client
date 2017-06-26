const initialState = {
    id: 7,
    name: 'Super Mario',
    users: [{
        id: 13,
        name: 'Tyler Durden',
    }, {
        id: 71,
        name: 'Robert Paulson',
    }, {
        id: 22,
        name: 'Jon McLane',
    }, {
        id: 31,
        name: 'Ellen Ripley',
    }, {
        id: 41,
        name: 'Indiana Jones',
    }, {
        id: 25,
        name: 'Tony Stark',
    }, {
        id: 66,
        name: 'Johnny Quest',
    }, {
        id: 87,
        name: 'Buck Rogers',
    }, {
        id: 98,
        name: 'Marvin Martian',
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
