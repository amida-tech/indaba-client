import update from 'immutability-helper';
import * as actionTypes from './actionTypes';
import { LOG_OUT } from '../../common/actionTypes/navActionTypes';

export const initialState = {
    ui: {
        message: '',
        isError: false,
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROFILE_UI_MESSAGE:
            return update(state, { ui: {
                message: { $set: action.message },
                isError: { $set: action.isError }
            } });
        case LOG_OUT:
            return initialState;
        default:
            return state;
    }
};
