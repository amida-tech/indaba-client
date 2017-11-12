import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const initialState = {
    subjects: [],
    ui: {
        query: '',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.PM_ALL_SUBJECTS_SET_QUERY:
        return update(state, { ui: {
            query: { $set: action.query },
        } });
    case actionTypes.PM_ALL_SUBJECTS_GET_SUBJECTS_SUCCESS:
        return update(state, {
            subjects: { $set: action.subjects },
        });
    default:
        return state;
    }
};
