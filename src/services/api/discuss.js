import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discuss = {
    getDiscuss: (taskId, callback) => {
        requests.apiGetRequest(getFullPath(`discussions/getByTaskId/${taskId}`), callback);
    },
    markResolved: (questionId, callback) => {
        requests.apiPutRequest(getFullPath(`discussions/resolve/${questionId}`), null, callback);
    },
};

export default discuss;
