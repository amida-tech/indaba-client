import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import apiService from './../../services/api';

export function updatePassword(oldPassword, password, messages) {
    return (dispatch) => {
        apiService.auth.updatePassword(oldPassword, password)
            .then((authResponse) => {
                dispatch(profileUIMessage(messages.PASSWORD_SUCCESS, false));
            })
            .catch((authError) => {
                dispatch(profileUIMessage(messages.PASSWORD_UPDATE_FAILURE, true));
            })
    }
};

export function profileUIMessage(message, isError) {
    return {
        type: actionTypes.PROFILE_UI_MESSAGE,
        message,
        isError,
    };
}
