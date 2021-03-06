export default {
    NODE_ENV: 'production',
    INDABA_CLIENT_URL: window.INDABA_CLIENT_URL || process.env.INDABA_CLIENT_URL,
    GREYSCALE_URL: window.GREYSCALE_URL || process.env.GREYSCALE_URL,
    AUTH_MICROSERVICE_URL: window.AUTH_MICROSERVICE_URL || process.env.AUTH_MICROSERVICE_URL,
    SURVEY_MICROSERVICE_URL: window.SURVEY_MICROSERVICE_URL || process.env.SURVEY_MICROSERVICE_URL,
    MESSAGING_MICROSERVICE_URL: window.MESSAGING_MICROSERVICE_URL
        || process.env.MESSAGING_MICROSERVICE_URL,
    INDABA_CLIENT_DEFAULT_REALM: window.INDABA_CLIENT_DEFAULT_REALM
        || process.env.INDABA_CLIENT_DEFAULT_REALM,
    SYS_MESSAGE_USER: window.SYS_MESSAGE_USER || process.env.SYS_MESSAGE_USER,
};
