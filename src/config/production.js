import cookie from 'react-cookies';

const settings = cookie.load('indabaConfig');
export default {
    NODE_ENV: 'production',
    INDABA_CLIENT_URL: settings.INDABA_CLIENT_URL || process.env.INDABA_CLIENT_URL,
    GREYSCALE_URL: settings.GREYSCALE_URL || process.env.GREYSCALE_URL,
    AUTH_MICROSERVICE_URL: settings.AUTH_MICROSERVICE_URL || process.env.AUTH_MICROSERVICE_URL,
    SURVEY_MICROSERVICE_URL: settings.SURVEY_MICROSERVICE_URL || process.env.SURVEY_MICROSERVICE_URL,
    MESSAGING_MICROSERVICE_URL: settings.MESSAGING_MICROSERVICE_URL
        || process.env.MESSAGING_MICROSERVICE_URL,
    INDABA_CLIENT_DEFAULT_REALM: settings.INDABA_CLIENT_DEFAULT_REALM
        || process.env.INDABA_CLIENT_DEFAULT_REALM,
    SYS_MESSAGE_USER: settings.SYS_MESSAGE_USER || process.env.SYS_MESSAGE_USER,
};
