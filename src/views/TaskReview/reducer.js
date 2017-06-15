import update from 'immutability-helper';
import * as t from './actionTypes';

export default (state = initialState, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
    case t.UPDATE_TASK_DUE_DATE:
        findUser = state.projects[action.projectId]
            .workflow.assignees.findIndex(user => (user.id === action.assigneeId));
        return update(state, { projects: {[action.projectId]:
            { workflow: { assignees: {[findUser]: { $merge: { dueDate: action.dueDate } }}}}}});
    case t.UPDATE_FLAGGED_QUESTION:
        findUser = state.projects[action.data.projectId]
            .workflow.assignees.findIndex(user => (user.id === action.data.assigneeId));
        return update(state, { projects: {[action.data.projectId]:
            { workflow: { assignees: {[findUser]:
            { response: {[action.data.questionId]:
                { flag: { $set: !action.data.resolved },
                flagHistory: { $push: [{
                    timestamp: action.data.timestamp,
                    comment: action.data.comment,
                    userId: action.data.signatureId,
                }]}}}}}}}}});
    }
}
