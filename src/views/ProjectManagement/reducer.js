import * as t from './actionTypes';
import _ from 'lodash';

export const initialState = {
  navigation: {
    subnav: "workflow",
  },
  workflow: {
    id: 0,
    name: "Pizza Lovers Anonymous",
    status: "Active",
    stages: [{
      id: 0,
      title: "Fill Out The Survey",
      startStage: "1/1/2017",
      endStage: "2/1/2017",
      userGroup: "Researchers",
      permissions: "Read Only"
    },{
      id: 1,
      title: "First Review",
      startStage: "3/3/2017",
      endStage: "4/3/2017",
      userGroup: "Managers",
      permissions: "Read and Write"
    }, {
      id: 2,
      title: "Second Review",
      startStage: "4/4/2017",
      endStage: "5/3/2017",
      userGroup: "Managers",
      permissions: "Read and Write"
    }, {
      id: 3,
      title: "Third Review",
      startStage: "5/4/2017",
      endStage: "6/3/2017",
      userGroup: "Managers",
      permissions: "Read and Write"
    }],
  roles: [{
      role: "Researchers",
      permissions: 2
      },{
      role: "Managers",
      permissions: 4
    }],
  subjects: ["Berlin", "Chicago", "K'unlun"],
  assignees: [{
      id: 0,
      name: "Jon McLane",
      role: 0,
      stage: 0,
      subject: 0
    },{
      id: 1,
      name: "Ellen Ripley",
      role: 0,
      stage: 0,
      subject: 1
    },{
      id: 2,
      name: "Indiana Jones",
      role: 1,
      stage: 1,
      subject: 0
    },{
      id: 3,
      name: "Tony Stark",
      role: 1,
      stage: 1,
      subject: 2
    }],
  unassigned: [{
    id: 4,
    name: "Johnny Quest",
    role: 0
  },{
    id: 5,
    name: "Buck Rogers",
    role: 0
  },{
    id: 6,
    name: "Marvin Martian",
    role: 1
  }]
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
    case t.ASSIGN_TASK: // Remove from unassigned, add to assigned.
      var newState = Object.assign({}, state);
      newState.workflow.assignees.push(action.payload);
      var i = newState.workflow.unassigned.length;
      while (i--){
        if(newState.workflow.unassigned[i].id === action.payload.id){
          newState.workflow.unassigned.splice(i,1);
          break;
        }
      }
      return newState;
    case t.UPDATE_WORKFLOW_PROJECT:
      return Object.assign({}, state, action.payload.project);
    case t.UPDATE_WORKFLOW_SURVEY:
      return Object.assign({}, state, action.payload.survey);
    case t.SUBNAVIGATE:
      return Object.assign({}, state, {navigation: {subnav: action.id}});
    case t.SHOW_MODAL:
      return Object.assign({}, state,
        {navigation: Object.assign({}, state.navigation, {modal: action.id})});
    case t.CLOSE_MODAL:
      var newState = Object.assign({}, state);
      delete newState.navigation.modal;
      return newState;
    case t.TOGGLE_FILTER:
      var newState = Object.assign({}, state);
      newState.workflow.filter = action.filter;
      return newState;
    case t.ADD_SUBJECT:
      var newState = Object.assign({}, state);
      newState.workflow.subjects.push(action.subject);
      delete newState.navigation.modal;
      return newState;
    case t.ADD_STAGE:
      var newState = Object.assign({}, state);
      newState.workflow.stages.push(action.stage);
      delete newState.navigation.modal;
      return newState;
    case t.SET_PROJECT_STATUS:
      return Object.assign({}, state,
        { workflow: Object.assign({}, state.workflow, { status: action.status })},
        { navigation: Object.assign({}, state.navigation, {modal: null})})
    case t.SET_SURVEY_STATUS:
      return Object.assign({}, state,
        { survey: Object.assign({}, state.survey, { status: action.status })},
        { navigation: Object.assign({}, state.navigation, {modal: null})})
    default:
      return state;
  }
}
