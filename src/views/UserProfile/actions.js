import * as actionTypes from './actionTypes';

import userService from '../../services/api/users';

export const getUserForProfile = userId => (dispatch) => {
    dispatch(_getUserForProfile());
    userService.getUser(userId, (err, response) => {
        if (!err) {
            dispatch(_getUserForProfileSuccess(response));
        } else {
            dispatch(_getUserForProfileError(err));
        }
    });
};

const _getUserForProfile = () => ({
    type: actionTypes.GET_USER_FOR_PROFILE,
});

const _getUserForProfileSuccess = user => ({
    type: actionTypes.GET_USER_FOR_PROFILE_SUCCESS,
    user,
});

const _getUserForProfileError = err => ({
    type: actionTypes.GET_USER_FOR_PROFILE_ERROR,
    err,
});
