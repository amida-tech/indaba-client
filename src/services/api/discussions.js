import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discussions = {
    getDiscussions: taskId => requests.apiGetRequest(getFullPath(`discussions?taskId=${taskId}`)),
    postDiscussion: (requestBody, callback) => {
        requests.apiPostRequest(getFullPath('discussions'), requestBody, callback);
    },
};

export default discussions;
