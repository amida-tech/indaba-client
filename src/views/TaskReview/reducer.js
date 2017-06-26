import update from 'immutability-helper';
import _ from 'lodash';
import * as type from './actionTypes';

export const initialState = {
    ui: {
        flagSidebar: {
            flags: [],
            active: 0,
            comment: '',
            resolved: false,
            notifyUserId: null,
        },
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.STORE_FLAGGED_ISSUES:
            return update(state,
                { ui: { flagSidebar: { flags: { $set: action.flags} } } });
        case type.SET_ACTIVE_FLAG:
            return update(state,
                { ui: { flagSidebar: { active: { $set: action.active } } } });
        case type.UPDATE_FLAG_COMMENT:
            return update(state,
                { ui: { flagSidebar: { comment: { $set: action.comment } } } });
        case type.UPDATE_MARK_RESOLVED:
            return update(state,
                { ui: { flagSidebar: { resolved: { $set: action.resolved } } } });
        case type.UPDATE_NOTIFY_USER:
            return update(state,
                { ui: { flagSidebar: { notifyUserId: { $set: action.notifyUserId } } } });
        default:
            return state;
    }
}
