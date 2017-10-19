import { FILTERS } from './constants';

const initialState = {
    ui: {
        filter: FILTERS.ALL_MESSAGES,
    },
    messages: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
    default:
        return state;
    }
};
