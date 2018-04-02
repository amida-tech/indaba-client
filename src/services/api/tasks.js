import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasksByProduct: productId =>
        requests.apiGetRequest(getFullPath(`products/${productId}/tasks`)),
    forceMoveTask: (productId, uoaId, callback) => {
        requests.apiGetRequest(
            requests.addQueryParams(getFullPath(`products/${productId}/move/${uoaId}`), { force: true }),
            callback);
    },
    moveTask: (productId, uoaId, callback) => {
        requests.apiGetRequest(getFullPath(`products/${productId}/move/${uoaId}`), callback);
    },
    getTaskById: (taskId, callback) => {
        requests.apiGetRequest(getFullPath(`tasks/${taskId}`), callback);
    },
    getSelfTasks: (callback) => {
        requests.apiGetRequest(getFullPath('tasks-self'), callback);
    },
    getTasksByUser: (userId, callback) => {
        requests.apiGetRequest(getFullPath(`tasks-by-user-id/${userId}`), callback);
    },
    postTask: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('tasks'), requestBody, callback);
    },
    putTask: (taskId, requestBody, callback) => {
        requests.apiPutRequest(getFullPath(`tasks/${taskId}`), requestBody, callback);
    },
    getTasks: (callback) => {
        requests.apiGetRequest(getFullPath('tasks'), callback);
    },
};

export default tasks;
