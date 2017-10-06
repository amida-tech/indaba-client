import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_HTTPS_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/api/v0/auth/login`;
        const body = `username=${authPayload.username}&password=${authPayload.password}`;
        requests.apiAuthPostRequest(path, body, callback);
    },
};

export default auth;
