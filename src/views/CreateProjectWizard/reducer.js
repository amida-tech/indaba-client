import * as t from './actionTypes';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
    case t.SET_PROJECT_TITLE:
        return Object.assign({}, state, { title: action.title });
    default:
        return state;
    }
};
