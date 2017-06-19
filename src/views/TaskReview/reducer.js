import update from 'immutability-helper';
import * as t from './actionTypes';

export default (state = initialState, action) => {
    let findUser;

    switch (action.type) {
        case type.UPDATE_TASK_DUE_DATE:
            findUser = state.projects[action.projectId]
                .tasks.findIndex(user =>
                    (user.id === action.assigneeId));
            return update(state, { projects: { [action.projectId]:
            { tasks: { [findUser]:
    				{ $merge: { dueDate: action.dueDate } } } } } });
        case type.UPDATE_FLAGGED_QUESTION:
            findUser = state.projects[action.data.projectId]
                .assignees.findIndex(user =>
                    (user.id === action.data.assigneeId));
            return update(state, { projects: { [action.data.projectId]:
            { tasks: { [findUser]:
            { response: { [action.data.questionId]:
            { flag: { $set: !action.data.resolved },
                flagHistory: { $push: [{
                    timestamp: action.data.timestamp,
                    comment: action.data.comment,
                    userId: action.data.signatureId,
                }] } } } } } } } });
    }
}
