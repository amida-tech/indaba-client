import * as requests from './requests';
import getFullPath from '../../utils/getFullPath';

const systemMessages = {
    send: requestBody => requests.apiPostRequest(getFullPath('system_messages'), requestBody),
};

export default systemMessages;
