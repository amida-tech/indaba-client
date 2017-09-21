import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getProfile: (callback) => {
        requests.apiGetRequest(getFullPath('users/self'), callback);
    },
    putProfile: (requestBody, callback) => {
        requests.apiPutRequest(getFullPath('users/self'), requestBody, callback);
    },
    getUsers: (callback) => {
        requests.apiGetRequest(getFullPath('users'), callback);
    },
    postNewUser: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('users'), requestBody, callback);
    },
};

export default users;
