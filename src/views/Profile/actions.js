import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import apiService from './../../services/api';

export function updatePassword(oldPassword, password, messages) {
    return (dispatch) => {
        apiService.auth.updatePassword(oldPassword, password)
            .then((authResponse) => {
                dispatch(updateProfileUIMessage(messages.PASSWORD_SUCCESS, false));
            })
            .catch((authError) => {
                dispatch(updateProfileUIMessage(messages.PASSWORD_UPDATE_FAILURE, true));
            })
    }
};

export function updateProfileUIMessage(message, isError) {
    return {
        type: actionTypes.PROFILE_UI_MESSAGE,
        message,
        isError,
    };
}
