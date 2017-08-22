import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const tasks = {
    getTasks: (callback) => {
        requests.apiGetRequest(getFullPath('tasks'), callback);
    },
};

export default tasks;
