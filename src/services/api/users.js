import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getProfile: (callback) => {
        requests.apiGetRequest(getFullPath('users/self'), callback);
    },
    putProfile: (requestBody, callback) => {
        requests.apiPutRequest(getFullPath('users/self'), requestBody, callback);
    },
    putProfileById: (id, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`users/${id}`), requestBody, callback);
    },
    getUsers: (callback) => {
        requests.apiGetRequest(getFullPath('users'), callback);
    },
    getUser: (id, callback) => {
        requests.apiGetRequest(getFullPath(`users/${id}`), callback);
    },
    postNewUser: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('users'), requestBody, callback);
    },
};

export default users;
