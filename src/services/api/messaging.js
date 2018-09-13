import * as requests from './requests';
import config from '../../config';

const rootURI = config.MESSAGING_MICROSERVICE_URL;

const messaging = {
    send: (message) => {
        const path = `${rootURI}/message/send`;
        const body = message;
        return requests.apiPostRequest(path, body);
    },
    reply: (id, message) => {
        const path = `${rootURI}/message/reply/${id}`;
        const body = message;
        return requests.apiPostRequest(path, body);
    },
    list: (params) => {
        const path = requests.addQueryParams(`${rootURI}/message/list`, params);
        return requests.apiGetRequest(path);
    },
    get: (id) => {
        const path = `${rootURI}/message/get/${id}`;
        return requests.apiGetRequest(path);
    },
    archive: (id) => {
        const path = `${rootURI}/message/archive/${id}`;
        return requests.apiPutRequest(path, {});
    },
    unarchive: (id) => {
        const path = `${rootURI}/message/unarchive/${id}`;
        return requests.apiPutRequest(path, {});
    },
    delete: (id) => {
        const path = `${rootURI}/message/delete/${id}`;
        return requests.apiDeleteRequest(path, {});
    },
    getThread: (originalMessageId) => {
        const path = `${rootURI}/thread/${originalMessageId}`;
        return requests.apiGetRequest(path);
    },
    listThreads: (params) => {
        const path = requests.addQueryParams(`${rootURI}/thread`, params);
        return requests.apiGetRequest(path);
    },
    markAsRead: (id) => {
        const path = `${rootURI}/message/markAsRead/${id}`;
        return requests.apiPutRequest(path, {});
    },
    markAsUnread: (id) => {
        const path = `${rootURI}/message/markAsUnread/${id}`;
        return requests.apiPutRequest(path, {});
    },
};

export default messaging;
