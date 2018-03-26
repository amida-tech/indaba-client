import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getProfile: () => requests.apiGetRequest(getFullPath('users/self')),
    putProfile: requestBody =>
        requests.apiPutRequest(getFullPath('users/self'), requestBody),
    putProfileById: (id, requestBody) =>
        requests.apiPutRequest(getFullPath(`users/${id}`), requestBody),
    getUsers: () => requests.apiGetRequest(getFullPath('users')),
    getUser: (id, callback) => {
        requests.apiGetRequest(getFullPath(`users/${id}`), callback);
    },
    postNewUser: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('users'), requestBody, callback);
    },
    inviteNewUser: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('users/self/organization/invite'), requestBody, callback);
    },
    deleteUser: (id, callback) => {
        requests.apiDeleteRequest(getFullPath(`users/${id}`), {}, callback);
    },
    activate: (requestBody, realm, token, callback) => {
        requests.apiPostRequest(getFullPath(`users/activate/${token}`, realm), requestBody, callback);
    },
};

export default users;
