export default {
    NODE_ENV: 'development',
    API_HTTP_URL: process.env.API_HTTP_URL || 'http://localhost:3005',
    API_HTTPS_URL: process.env.API_HTTPS_URL || 'http://localhost:3005',

    AUTH_API_HTTP_URL: process.env.AUTH_API_HTTP_URL || 'http://localhost:4000/api/v0',
    AUTH_API_HTTPS_URL: process.env.AUTH_API_HTTPS_URL || 'https://localhost:4000/api/v0',

    SURVEY_API_HTTP_URL: process.env.SURVEY_API_HTTP_URL || 'http://localhost:9005/api/v1.0',
    SURVEY_API_HTTPS_URL: process.env.SURVEY_API_HTTPS_URL || 'https://localhost:9005/api/v1.0',

    MESSAGE_API_HTTP_URL: process.env.MESSAGE_API_HTTP_URL || 'coming_soon',
    MESSAGE_API_HTTPS_URL: process.env.MESSAGE_API_HTTPS_URL || 'coming_soon',
    REALM: process.env.REALM || 'testorg',
};
