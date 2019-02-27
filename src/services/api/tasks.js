import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasksByProduct: productId => requests.apiGetRequest(getFullPath(`products/${productId}/tasks`)),
    forceMoveTask: (productId, uoaId) => requests.apiPutRequest(
        requests.addQueryParams(getFullPath(`products/${productId}/move/${uoaId}`), { force: true }),
    ),
    moveTask: (productId, uoaId) => requests.apiPutRequest(getFullPath(`products/${productId}/move/${uoaId}`)),
    getTaskById: taskId => requests.apiGetRequest(getFullPath(`tasks/${taskId}`)),
    getSelfTasks: () => requests.apiGetRequest(getFullPath('tasks-self')),
    getTasksByUser: userId => requests.apiGetRequest(getFullPath(`tasks-by-user-id/${userId}`)),
    postTask: requestBody => requests.apiPostRequest(getFullPath('tasks'), requestBody),
    putTask: (taskId, requestBody) => requests.apiPutRequest(getFullPath(`tasks/${taskId}`), requestBody),
    getTasks: () => requests.apiGetRequest(getFullPath('tasks')),
    deleteTask: taskId => requests.apiDeleteRequest(getFullPath(`tasks/${taskId}`)),
};

export default tasks;
