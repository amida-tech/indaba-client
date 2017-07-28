import cookie from 'react-cookies';
import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const users = {
    addNewUser: (requestBody) => {
        return new Promise((resolve) => {
            // simulate network call
            setTimeout(() => {
                resolve(Object.assign({}, requestBody, { id: Math.floor(1000 * Math.random()) }));
            }, 10);
        });
    },
    getCurrentUser: (callback) => {
        const path = getFullPath(`/${cookie.load('indaba-realm')}/v0.2/users/self`);
        requests.apiGetRequest(path, callback);
    },
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
