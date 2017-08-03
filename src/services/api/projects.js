import cookie from 'react-cookies';
import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const projects = {
    getProjects: (callback) => {
        const path = getFullPath(`/${cookie.load('indaba-realm')}/v0.2/projects`);
        requests.apiGetRequest(path, callback);
    },
    postProject: (requestBody, callback) => {
        const path = getFullPath(`/${cookie.load('indaba-realm')}/v0.2/projects`);
        requests.apiPostRequest(path, requestBody, callback);
    },
};

export default projects;
