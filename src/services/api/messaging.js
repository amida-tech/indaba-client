import cookie from 'react-cookies';
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
    listThreads: (callback, params) => {
        const path = requests.addQueryParams(`${rootURI}/thread`, params);
        requests.apiGetRequest(path, callback);
    },
    graphql: (graphQLParams) => {
        return fetch(`${rootURI}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: cookie.load('indaba-auth'),
            },
            body: JSON.stringify(graphQLParams),
        }).then(response => response.json());
    },
};

export default messaging;
