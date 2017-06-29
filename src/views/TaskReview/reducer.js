import update from 'immutability-helper';
import _ from 'lodash';

import * as type from './actionTypes';
import { UPDATE_FLAGGED_QUESTION } from '../../common/actionTypes/discussActionTypes';

export const initialState = {
    ui: {
        flags: [],
        flagSidebar: {
            active: 0,
            comment: '',
            resolved: false,
            notifyUser: {
                id: null,
                name: null,
            },
            timestamp: null,
            signatureId: null,
        },
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
    case type.STORE_FLAGGED_ISSUES:
        return update(state,
            { ui: { flags: { $set: action.flags } } });
    case type.SET_ACTIVE_FLAG:
        return update(state,
            { ui: { flagSidebar: {
                active: { $set: action.active },
                timestamp: { $set: action.timestamp },
            } } });
    case type.SET_SIGNATURE_ID:
        return update(state,
            { ui: { flagSidebar: { signatureId: { $set: action.signatureId } } } });
    case type.UPDATE_FLAG_COMMENT:
        return update(state,
            { ui: { flagSidebar: { comment: { $set: action.comment } } } });
    case type.UPDATE_MARK_RESOLVED:
        return update(state,
            { ui: { flagSidebar: { resolved: { $set: action.resolved } } } });
    case type.UPDATE_NOTIFY_USER:
        return update(state,
            { ui: { flagSidebar: { notifyUser: { $set: action.notifyUser } } } });
    case type.CANCEL_FLAGGED_UPDATE:
        return update(state,
            { ui: { flagSidebar: {
                comment: { $set: '' },
                resolved: { $set: false },
                timestamp: { $set: null },
            } } });
    case UPDATE_FLAGGED_QUESTION: {
        const flagIndex = _.findIndex(state.ui.flags, flag =>
            flag.id === action.data.active.id);

// You're on the right track below.
        const what = update(state, { ui: {
            flags: { $splice: [[flagIndex, 1]] },
            flagSidebar: { $set: { active: state.ui.flags[0] } } } });
        console.log(what);

        return (action.data.resolved ?
            update(state, { ui: {
                flags: { $splice: [[flagIndex, 1]] },
                flagSidebar: { $merge: { active: state.ui.flags[0] } } } }) :
            update(state, { ui: { flags: { [flagIndex]: { flagHistory: { $push: [{
                timestamp: action.data.timestamp,
                comment: action.data.comment,
                userId: action.data.signatureId,
            }] } } } } }));
    }
    default:
        return state;
    }
};
