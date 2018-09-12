import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getProfile: () => requests.apiGetRequest(getFullPath('users/self')),
    putProfile: requestBody => requests.apiPutRequest(getFullPath('users/self'), requestBody),
    putProfileById: (id, requestBody) => requests.apiPutRequest(getFullPath(`users/${id}`), requestBody),
    getUsers: () => requests.apiGetRequest(getFullPath('users')),
    inviteNewUser: requestBody => requests.apiPostRequest(getFullPath('users/self/organization/invite'), requestBody),
    deleteUser: id => requests.apiDeleteRequest(getFullPath(`users/${id}`), {}),
    activate: (requestBody, realm, token) => requests.apiPostRequest(getFullPath(`users/activate/${token}`, realm), requestBody),
};

export default users;
