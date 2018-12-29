import cookie from 'react-cookies';
import { get } from 'lodash';

const settings = cookie.load('indabaConfig');

export default {
    NODE_ENV: 'production',
    INDABA_CLIENT_URL: get(settings, 'INDABA_CLIENT_URL') || process.env.INDABA_CLIENT_URL,
    GREYSCALE_URL: get(settings, 'GREYSCALE_URL') || process.env.GREYSCALE_URL,
    AUTH_MICROSERVICE_URL: get(settings, 'AUTH_MICROSERVICE_URL') || process.env.AUTH_MICROSERVICE_URL,
    SURVEY_MICROSERVICE_URL: get(settings, 'SURVEY_MICROSERVICE_URL') || process.env.SURVEY_MICROSERVICE_URL,
    MESSAGING_MICROSERVICE_URL: get(settings, 'MESSAGING_MICROSERVICE_URL')
        || process.env.MESSAGING_MICROSERVICE_URL,
    INDABA_CLIENT_DEFAULT_REALM: get(settings, 'INDABA_CLIENT_DEFAULT_REALM')
        || process.env.INDABA_CLIENT_DEFAULT_REALM,
    SYS_MESSAGE_USER: get(settings, 'SYS_MESSAGE_USER') || process.env.SYS_MESSAGE_USER,
};
