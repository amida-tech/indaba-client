export default {
    NODE_ENV: 'development',
    API_URL: process.env.API_URL || 'http://localhost:3005',

    AUTH_API_URL: process.env.AUTH_API_URL || 'http://localhost:4000/api/v0',

    SURVEY_API_URL: process.env.SURVEY_API_URL || 'http://localhost:9005/api/v1.0',

    MESSAGING_API_URL: process.env.MESSAGING_API_URL || 'http://localhost:4002/api',

    REALM: process.env.REALM || 'testorg',

    SYS_MESSAGE_USER: process.env.SYS_MESSAGE_USER || 'indaba@example.com',
};
