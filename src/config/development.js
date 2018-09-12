export default {
    NODE_ENV: 'development',
    GREYSCALE_URL: window.GREYSCALE_URL || process.env.GREYSCALE_URL || 'http://localhost:3005',

    AUTH_MICROSERVICE_URL: window.AUTH_MICROSERVICE_URL || process.env.AUTH_MICROSERVICE_URL || 'http://localhost:4000/api/v1',

    SURVEY_MICROSERVICE_URL: window.SURVEY_MICROSERVICE_URL || process.env.SURVEY_MICROSERVICE_URL || 'http://localhost:9005/api/v1.0',

    MESSAGING_MICROSERVICE_URL: window.MESSAGING_MICROSERVICE_URL || process.env.MESSAGING_MICROSERVICE_URL || 'http://localhost:4001/api/v1',

    INDABA_CLIENT_DEFAULT_REALM: window.INDABA_CLIENT_DEFAULT_REALM || process.env.INDABA_CLIENT_DEFAULT_REALM || 'testorg',

    SYS_MESSAGE_USER: window.SYS_MESSAGE_USER || process.env.SYS_MESSAGE_USER || 'indaba@example.com',
};
