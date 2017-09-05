import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discuss = {
    getDiscuss: (taskId, callback) => {
        requests.apiGetRequest(getFullPath(`discussions/getByTaskId/${taskId}`), callback);
    },
};

export default discuss;
