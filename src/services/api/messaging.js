import * as requests from './requests';
import config from '../../config';

const rootURI = config.MESSAGING_API_HTTPS_URL;

const messaging = {
    send: (message, callback) => {
        const path = `${rootURI}/api/message/send`;
        const body = message;
        requests.apiPostRequest(path, body, callback);
    },
    list: (callback) => {
        const path = `${rootURI}/api/message/list`;
        requests.apiGetRequest(path, callback);
    },
    get: (id, callback) => {
        const path = `${rootURI}/api/message/get/${id}`;
        requests.apiGetRequest(path, callback);
    },
    archive: (id, callback) => {
        const path = `${rootURI}/api/message/archive/${id}`;
        requests.apiPutRequest(path, {}, callback);
    },
    delete: (id, callback) => {
        const path = `${rootURI}/api/message/delete/${id}`;
        requests.apiDeleteRequest(path, {}, callback);
    },
};

export default messaging;
