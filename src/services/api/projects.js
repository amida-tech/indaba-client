import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: (callback) => {
        requests.apiGetRequest(getFullPath('projects'), callback);
    },
    postProjectPart: (component, requestBody, callback) => {
        requests.apiPostRequest(getFullPath(component), requestBody, callback);
    },
};

export default projects;
