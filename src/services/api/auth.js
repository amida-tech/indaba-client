import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const auth = {
    login: (authPayload, callback) => {
        const path = getFullPath(`/${authPayload.realm}/v0.2/users/token`);
        const authHash = btoa(`${authPayload.username}:${authPayload.password}`);
        requests.apiAuthGetRequest(path, authHash, callback);
    },
};

export default auth;
