import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getProfile: () => requests.apiGetRequest(getFullPath('users/self')),
    putProfile: requestBody =>
        requests.apiPutRequest(getFullPath('users/self'), requestBody),
    putProfileById: (id, requestBody) =>
        requests.apiPutRequest(getFullPath(`users/${id}`), requestBody),
    getUsers: () => requests.apiGetRequest(getFullPath('users')),
    inviteNewUser: requestBody =>
        requests.apiPostRequest(getFullPath('users/self/organization/invite'), requestBody),
    deleteUser: (id, callback) => {
        requests.apiDeleteRequest(getFullPath(`users/${id}`), {}, callback);
    },
    activate: (requestBody, realm, token, callback) => {
        requests.apiPostRequest(getFullPath(`users/activate/${token}`, realm), requestBody, callback);
    },
};

export default users;
