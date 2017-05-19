import * as t from './actionTypes';

export const initialState = {
  subnav: {
    selected: "workflow"
  },
  project: {
    id: 0,
    name: "Pizza Lovers Anonymous",
    status: "Active"
  },
  survey: {
    id: 0,
    name: "How much do you like pizza?",
    status: "Published",
    description: "If you don't like pizza, what are you doing here."
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case t.GET_WORKFLOW:
      return Object.assign({}, state, action.payload);
    case t.UPDATE_WORKFLOW_PROJECT:
      return Object.assign({}, state, action.payload.project);
    case t.UPDATE_WORKFLOW_SURVEY:
      return Object.assign({}, state, action.payload.survey);
    case t.SUBNAVIGATE:
      return Object.assign({}, state, {subnav: {selected: action.id}});
    default:
      return state;
  }
}
