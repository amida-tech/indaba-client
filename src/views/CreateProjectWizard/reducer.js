import * as t from './actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_PROJECT_TITLE:
        return Object.assign({}, state, { title: action.title });
    case t.ADD_SUBJECT:
        return Object.assign({}, state, { subjects: [...(state.subjects || []), action.subject] });
    default:
        return state;
    }
};
