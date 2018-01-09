import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const systemMessages = {
    send: requestBody =>
    new Promise((resolve, reject) =>
    requests.apiPostRequest(
        getFullPath('system_messages'),
        requestBody,
        (err, response) => (err ? reject(err) : resolve(response))),
    ),
};

export default systemMessages;
