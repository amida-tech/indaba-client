export default {
    NODE_ENV: 'staging',
    API_HTTP_URL: process.env.API_HTTP_URL || 'http://openshift.amida.com/',
    API_HTTPS_URL: process.env.API_HTTPS_URL || 'https://openshift.amida.com/',

    AUTH_API_HTTP_URL: process.env.AUTH_API_HTTP_URL || 'http://openshift.amida.com/api/v0',
    AUTH_API_HTTPS_URL: process.env.AUTH_API_HTTPS_URL || 'https://openshift.amida.com/api/v0',
    REALM: 'testorg',

    SYS_MESSAGE_USER: process.env.SYS_MESSAGE_USER,
};
