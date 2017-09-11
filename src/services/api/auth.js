import * as requests from './requests';
import config from '../../config';

const rootURI = config.API_HTTPS_URL;

const auth = {
    login: (authPayload, callback) => { // Auth does not use cookies for login.
        const path = `${rootURI}/${authPayload.realm}/v0.2/users/token`;
        const authHash = btoa(`${authPayload.username}:${authPayload.password}`);
        requests.apiAuthGetRequest(path, authHash, callback);
    },
};

export default auth;
