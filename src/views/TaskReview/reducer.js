import update from 'immutability-helper';
import _ from 'lodash';

import * as type from './actionTypes';
import { UPDATE_FLAGGED_QUESTION } from '../../common/actionTypes/discussActionTypes';

export const initialState = {
    ui: {
        flags: [],
        flagSidebar: {
            active: 0, // Id of flag above.
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
            flag.id === action.data.active);
        if (action.data.resolved) {
            let nextId = 0;
            if (flagIndex === 0 && state.ui.flags.length > 1) {
                nextId = state.ui.flags[1].id;
            } else if (flagIndex > 0) {
                nextId = state.ui.flags[0].id;
            }
            console.log(nextId);
            return update(state, { ui: {
                flags: { $splice: [[flagIndex, 1]] },
                flagSidebar: { active: { $set: nextId } } } });
        }
        return update(state, { ui: {
            flags: { [flagIndex]: { flagHistory: { $push: [{
                timestamp: action.data.timestamp,
                comment: action.data.comment,
                userId: action.data.signatureId,
            }] } } },
            flagSidebar: {
                active: { $set: action.data.active },
                timestamp: { $set: action.data.timestamp },
            } } });
    }
    default:
        return state;
    }
};
