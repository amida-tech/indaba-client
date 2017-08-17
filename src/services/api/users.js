import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    getCurrentUser: (callback) => {
        requests.apiGetRequest(getFullPath('users/self'), callback);
    },
    getUsers: (callback) => {
        requests.apiGetRequest(getFullPath('users'), callback);
    },
    addNewUser: (callback) => {
        requests.apiPostRequest(getFullPath('users'), callback);
    },
    // addNewUser: (requestBody) => {
    //     return new Promise((resolve) => {
    //         // simulate network call
    //         setTimeout(() => {
    //         resolve(Object.assign({}, requestBody, { id: Math.floor(1000 * Math.random()) }));
    //         }, 10);
    //     });
    // },
    // getUserById: (id, callback) => {
    //     const path = getFullPath(`/users/${id}`);
    //     requests.apiGetRequest(path, callback);
    // },
    // addUser: (requestBody, callback) => {
    //     const path = getFullPath('/users');
    //     requests.apiPostRequest(path, requestBody, callback);
    // },
    // updateUser: (id, requestBody, callback) => {
    //     const path = getFullPath(`/users/${id}`);
    //     requests.apiPatchRequest(path, requestBody, callback);
    // },
    // getAllUsers: (callback) => {
    //     const path = getFullPath('/users?role=all');
    //     requests.apiGetRequest(path, callback);
    // },
};

export default users;
