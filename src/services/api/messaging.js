import * as requests from './requests';
import config from '../../config';

const rootURI = config.MESSAGING_API_URL;

const messaging = {
    send: (message, callback) => {
        const path = `${rootURI}/message/send`;
        const body = message;
        requests.apiPostRequest(path, body, callback);
    },
    reply: (id, message, callback) => {
        const path = `${rootURI}/message/reply/${id}`;
        const body = message;
        requests.apiPostRequest(path, body, callback);
    },
    list: (callback, params) => {
        const path = requests.addQueryParams(`${rootURI}/message/list`, params);
        requests.apiGetRequest(path, callback);
    },
    listArchived: (callback) => {
        const path = `${rootURI}/message/list?archived=true`;
        requests.apiGetRequest(path, callback);
    },
    get: (id, callback) => {
        const path = `${rootURI}/message/get/${id}`;
        requests.apiGetRequest(path, callback);
    },
    archive: (id, callback) => {
        const path = `${rootURI}/message/archive/${id}`;
        requests.apiPutRequest(path, {}, callback);
    },
    unarchive: (id, callback) => {
        const path = `${rootURI}/message/unarchive/${id}`;
        requests.apiPutRequest(path, {}, callback);
    },
    delete: (id, callback) => {
        const path = `${rootURI}/message/delete/${id}`;
        requests.apiDeleteRequest(path, {}, callback);
    },
    getThread: (originalMessageId, callback) => {
        const path = `${rootURI}/thread/${originalMessageId}`;
        requests.apiGetRequest(path, callback);
    },
    listThreads: (callback, params) => {
        const path = requests.addQueryParams(`${rootURI}/thread`, params);
        requests.apiGetRequest(path, callback);
    },
    markAsRead: (id, callback) => {
        const path = `${rootURI}/message/markAsRead/${id}`;
        requests.apiPutRequest(path, {}, callback);
    },
};

export default messaging;
