import * as requests from './requests';
import config from '../../config';

const rootURI = config.AUTH_API_HTTPS_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/api/auth/login`;
        requests.apiPostRequest(path, authPayload, callback);
    },
};

export default auth;
