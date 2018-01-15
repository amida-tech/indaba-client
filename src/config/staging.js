export default {
    NODE_ENV: 'staging',
    API_URL: process.env.API_URL || 'http://openshift.amida.com/',
    AUTH_API_URL: process.env.AUTH_API_URL || 'http://openshift.amida.com/api/v0',
    REALM: 'testorg',

    SYS_MESSAGE_USER: process.env.SYS_MESSAGE_USER,
};
