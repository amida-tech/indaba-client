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
                switch (authError.body.code) {
                    case "INCORRECT_PASSWORD":
                        dispatch(profileUIMessage(messages.INCORRECT_PASSWORD, true));
                        break;
                    case "STRONG_PASS_REQUIRED":
                        dispatch(profileUIMessage(messages.PASSWORD_WEAK, true));
                        break;
                    default:
                        dispatch(profileUIMessage(messages.PASSWORD_UPDATE_FAILURE, true));
                };
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
