const AUTH_API_VERSION = process.env.AUTH_API_VERSION || 'v0';

export default {
    NODE_ENV: 'staging',
    API_HTTP_URL: process.env.API_HTTP_URL || 'http://openshift.amida.com/',
    API_HTTPS_URL: process.env.API_HTTPS_URL || 'https://openshift.amida.com/',

    AUTH_API_HTTP_URL: process.env.AUTH_API_HTTP_URL || `http://openshift.amida.com/api/${AUTH_API_VERSION}`,
    AUTH_API_HTTPS_URL: process.env.AUTH_API_HTTPS_URL || `https://openshift.amida.com/api/${AUTH_API_VERSION}`,
    REALM: 'testorg',

    SYS_MESSAGE_USER: process.env.SYS_MESSAGE_USER,
};
