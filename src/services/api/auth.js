import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const auth = {
    login: (authPayload, callback) => {
        console.log('login');
        console.log(authPayload);
        console.log(callback);
        const path = getFullPath('/auth/basic');
        const authHash = btoa(`${authPayload.username}:${authPayload.password}`);
        requests.apiAuthGetRequest(path, authHash, callback);
    },
};

export default auth;
