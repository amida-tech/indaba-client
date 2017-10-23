export default {
    NODE_ENV: 'development',
    API_HTTP_URL: process.env.API_HTTP_URL || 'http://localhost:3005',
    API_HTTPS_URL: process.env.API_HTTPS_URL || 'http://localhost:3005',

    AUTH_API_HTTP_URL: process.env.AUTH_API_HTTP_URL || 'http://localhost:4000/api/v0',
    AUTH_API_HTTPS_URL: process.env.AUTH_API_HTTPS_URL || 'https://localhost:4000/api/v0',
    REALM: process.env.REALM || 'testorg',
};
