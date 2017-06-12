import en from '../../i18n/en';

const initialState = {
    users: [{
        id: 0,
        name: 'Tyler Durden',
        permissions: 4,
    }, {
        id: 1,
        name: 'Robert Paulson',
        permissions: 0,
    }],
};

export const UserReducer = (state = initialState, action) => {
    return state;
};
