import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasks: (projectId, callback) => {
        requests.apiGetRequest(getFullPath(`tasks-by-proj-id/${projectId}`), callback);
    },
};

export default tasks;
