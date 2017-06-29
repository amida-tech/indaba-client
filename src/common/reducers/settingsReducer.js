import en from '../../i18n/en.json';

const initialState = {
    language: {
        choice: 'en',
        vocabulary: en,
    },
};

export const SettingsReducer = (state = initialState) => { // Needs arg: action
    return state;
};
