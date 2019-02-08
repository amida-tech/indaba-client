import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_MICROSERVICE_URL;

const auth = {
    login: (authPayload) => { // Auth does not use cookies for login.
        const path = `${rootURI}/auth/login`;
        const body = {
            username: authPayload.username,
            password: authPayload.password,
        };
        return requests.apiAuthPostRequest(path, body, false);
    },
    requestResetToken: (email) => {
        const path = `${rootURI}/auth/reset-password`;
        const body = {
            email,
            resetPageUrl: `${config.INDABA_CLIENT_URL}/reset-password`,
        };
        return requests.apiAuthPostRequest(path, body, false);
    },
    resetPassword: (token, password) => {
        const path = `${rootURI}/auth/reset-password/${token}`;
        const body = { password };
        return requests.apiAuthPostRequest(path, body, false);
    },
    updatePassword: (oldPassword, password) => {
        const path = `${rootURI}/auth/update-password`;
        const body = { oldPassword, password };
        return requests.apiAuthPostRequest(path, body, true);
    },
    requestRefreshToken: (username, refreshToken) => {
        const path = `${rootURI}/auth/token`;
        const body = { username, refreshToken };
        return requests.apiAuthPostRequest(path, body, false);
    },
};

export default auth;
