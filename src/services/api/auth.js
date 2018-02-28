import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_URL;

const auth = {
    login: (authPayload) => { // Auth does not use cookies for login.
        const path = `${rootURI}/auth/login`;

        const body = {
            username: authPayload.username,
            password: authPayload.password,
        };

        return requests.apiAuthPostRequest(path, body);
    },
    requestResetToken: (email) => {
        const path = `${rootURI}/auth/reset-password`;
        const body = { email };
        return requests.apiAuthPostRequest(path, body);
    },
    resetPassword: (token, password) => {
        const path = `${rootURI}/auth/reset-password/${token}`;
        const body = { password };

        return requests.apiAuthPostRequest(path, body);
    },
};

export default auth;
