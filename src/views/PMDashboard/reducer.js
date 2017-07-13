import { FILTERS } from './constants';

const initialState = {
    ui: {
        searchQuery: '',
        filter: FILTERS.ALL_PROJECTS,
    },
};

export default (state = initialState) => {
    return state;
};
