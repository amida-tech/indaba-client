import * as requests from './requests';
import config from '../../config';

const rootURI = config.MESSAGING_API_HTTPS_URL;

const messaging = {
    send: (message, callback) => {
        const path = `${rootURI}/api/message/send`;
        const body = message;
        requests.apiPostRequest(path, body, callback);
    },
};

export default messaging;
