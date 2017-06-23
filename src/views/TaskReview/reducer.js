import update from 'immutability-helper';
import * as type from './actionTypes';

export const initialState = {
    ui: {
        flagSidebar: {
        },
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
