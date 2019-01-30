import { push } from 'react-router-redux';

import apiService from './../../services/api';

export function updatePassword(oldPassword, password) {
    return (dispatch) => {
        const authPayload = {
            oldPassword,
            password,
        };
        apiService.auth.updatePassword(authPayload)
            .then((response) => {
                return (response);
            }
            )
            .catch()
    }
};

