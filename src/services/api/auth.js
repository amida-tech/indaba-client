import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/auth/login`;
        const body = `${encodeURIComponent('username')}=${encodeURIComponent(authPayload.username)}&${
            encodeURIComponent('password')}=${encodeURIComponent(authPayload.password)}`;
        requests.apiAuthPostRequest(path, body, callback);
    },
};

export default auth;
