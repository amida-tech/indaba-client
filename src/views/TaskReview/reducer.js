import update from 'immutability-helper';
import * as type from './actionTypes';

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
    default:
        return state;
    }
};
