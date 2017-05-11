const en = require('../../i18n/en.json'); //Temporary.

const initialState = {
  language: {
    choice: 'en',
    vocabulary: en
  }
};

export const SettingsReducer = (state = initialState, action) => {
    return state;
};
