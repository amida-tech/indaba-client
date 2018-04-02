import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const discussions = {
    getDiscussions: taskId => requests.apiGetRequest(getFullPath(`discussions?taskId=${taskId}`)),
    postDiscussion: requestBody => requests.apiPostRequest(getFullPath('discussions'), requestBody),
};

export default discussions;
