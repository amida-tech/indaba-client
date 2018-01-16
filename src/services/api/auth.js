import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_HTTP_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/auth/login`;
        const body = `username=${authPayload.username}&password=${authPayload.password}`;
        console.log(`LOGGING IN WITH: ${body}`);
        requests.apiAuthPostRequest(path, body, callback);
    },
};

export default auth;
