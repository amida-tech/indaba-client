export default {
    NODE_ENV: 'staging',
    API_URL: process.env.API_STAGING_URL || 'a93777759f18511e7b4a1060c5163e47-2052654379.us-west-2.elb.amazonaws.com:3005',

    AUTH_API_URL: process.env.AUTH_STAGING_API_URL || 'aa7e54a82ede111e7b4a1060c5163e47-61384471.us-west-2.elb.amazonaws.com:4000',

    SURVEY_API_URL: process.env.SURVEY_STAGING_API_URL || 'a51eab6f4f0e511e7b4a1060c5163e47-1629568428.us-west-2.elb.amazonaws.com:9005',

    MESSAGING_API_URL: process.env.MESSAGING_STAGING_API_URL || 'a4303acc7a3f011e7b4a1060c5163e47-1089830322.us-west-2.elb.amazonaws.com:4001/api',

    REALM: process.env.REALM || 'testorg',

    SYS_MESSAGE_USER: process.env.SYS_STAGING_MESSAGE_USER || 'indaba@example.com',
};
