import cookie from 'react-cookie';
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
        console.log('JAMES');
        console.log(cookie.get['indaba-auth']);
        const path = getFullPath(`/${cookie.get['indaba-realm']}/v0.2/users/self`);
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
