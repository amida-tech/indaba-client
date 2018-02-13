import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/auth/login`;

        const body = {
            username: authPayload.username,
            password: authPayload.password,
        };

        requests.apiAuthPostRequest(path, body)
        .then(response => callback(null, response), err => callback(err));
    },
    requestResetToken: (email, callback) => {
        const path = `${rootURI}/auth/reset-password`;
        const body = { email };
        requests.apiAuthPostRequest(path, body)
        .then(response => callback(null, response), err => callback(err));
    },
    resetPassword: (token, password) => {
        const path = `${rootURI}/auth/reset-password/${token}`;
        const body = { password };

        return requests.apiAuthPostRequest(path, body);
    },
};

export default auth;
