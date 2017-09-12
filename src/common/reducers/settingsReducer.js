import en from '../../i18n/en.json';
import { LOG_OUT } from '../actionTypes/navActionTypes';

const initialState = {
    language: {
        choice: 'en',
        vocabulary: en,
    },
};

export const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOG_OUT:
        return initialState;
    default:
        return state;
    }
};
