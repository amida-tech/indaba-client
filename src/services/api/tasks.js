import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasksByProduct: productId => requests.apiGetRequest(getFullPath(`products/${productId}/tasks`)),
    forceMoveTask: (productId, uoaId) => requests.apiPostRequest(
        requests.addQueryParams(getFullPath(`products/${productId}/move/${uoaId}`), { force: true }),
    ),
    moveTask: (productId, uoaId) => requests.apiGetRequest(getFullPath(`products/${productId}/move/${uoaId}`)),
    getTaskById: taskId => requests.apiGetRequest(getFullPath(`tasks/${taskId}`)),
    getSelfTasks: () => requests.apiGetRequest(getFullPath('tasks-self')),
    getTasksByUser: userId => requests.apiGetRequest(getFullPath(`tasks-by-user-id/${userId}`)),
    postTask: requestBody => requests.apiPostRequest(getFullPath('tasks'), requestBody),
    putTask: (taskId, requestBody) => requests.apiPutRequest(getFullPath(`tasks/${taskId}`), requestBody),
    getTasks: () => requests.apiGetRequest(getFullPath('tasks')),
};

export default tasks;
