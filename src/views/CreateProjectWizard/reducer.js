import * as t from './actionTypes';
import update from 'immutability-helper';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_PROJECT_TITLE:
        return Object.assign({}, state, { title: action.title });
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
