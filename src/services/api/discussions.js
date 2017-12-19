import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discussions = {
    getDiscussions: (taskId, callback) => {
        requests.apiGetRequest(getFullPath(`discussions?taskId=${taskId}`), callback);
    },
    postDiscussion: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('discussions'), requestBody, callback);
    },
    markResolved: (questionId, callback) => {
        requests.apiPutRequest(getFullPath(`discussions/resolve/${questionId}`), null, callback);
    },
};

export default discussions;
