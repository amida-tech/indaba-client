import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discussions = {
    getDiscussions: (taskId, callback) => {
        requests.apiGetRequest(getFullPath(`discussions/getByTaskId/${taskId}`), callback);
    },
    postDiscussion: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('discussions'), requestBody, callback);
    },
    putDiscussion: (discussionId, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(`discussions/${discussionId}`), requestBody, callback);
    },
    putResolve: (questionId, callback) => {
        requests.apiPutRequest(getFullPath(`discussions/resolve/${questionId}`), null, callback);
    },
};

export default discussions;
