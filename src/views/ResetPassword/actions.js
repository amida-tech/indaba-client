import { push } from 'react-router-redux';

import apiService from '../../services/api';
import * as actionTypes from './actionTypes';

export const resetPassword = (token, password) => dispatch => apiService.auth.resetPassword(token, password)
    .then(() => dispatch(push('/login')));

export function resetPasswordUIMessage(message, error) {
    return {
        type: actionTypes.RESET_PASSWORD_UI_MESSAGE,
        message,
        error,
    };
}
