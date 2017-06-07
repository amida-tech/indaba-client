import update from 'immutability-helper';
import * as t from './actionTypes';

const initialState = {
    project: {
        status: 'Inactive',
    },
    survey: {
        status: 'Draft',
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_PROJECT_TITLE:
        return update(state, { project: { name: { $set: action.title } } });
    case t.ADD_SUBJECTS:
        return Object.assign({}, state,
            { subjects: [...(state.subjects || []), ...action.subjects] });
    case t.DELETE_SUBJECT:
        return update(state, { subjects:
            { $splice: [[state.subjects.indexOf(action.subject), 1]] } });
    default:
        return state;
    }
};
