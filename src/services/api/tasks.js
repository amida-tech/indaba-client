import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasksByProject: (projectId, callback) => {
        requests.apiGetRequest(getFullPath(`tasks-by-proj-id/${projectId}`), callback);
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
};

export default tasks;
