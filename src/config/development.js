export default {
    NODE_ENV: 'development',
    API_HTTP_URL: process.env.API_HTTP_URL || 'http://localhost:3005',
    API_HTTPS_URL: process.env.API_HTTPS_URL || 'http://localhost:3005',
    port: 3005,
    encoding: 'utf8',
    domain: 'your_site_domain.com',
    authToken: {
        expiresAfterSeconds: 360000 * 24, // 24 hour
    },
    pgConnect: {
        user: process.env.RDS_USERNAME || process.env.INDABA_PG_USERNAME || 'db_user',
        testuser: process.env.RDS_TESTUSER || process.env.INDABA_PG_TESTUSER || 'test', // make trust method for this user in PostgreSQL Client Authentication Configuration File (pg_hba.conf)
        password: process.env.RDS_PASSWORD || process.env.INDABA_PG_PASSWORD || 'password',
        database: process.env.INDABA_PG_DB || 'database',
        host: process.env.RDS_HOSTNAME || process.env.INDABA_PG_HOSTNAME || 'localhost',
        port: 5432,
        adminSchema: 'public',
        sceletonSchema: 'sceleton',
    },
    mc: { // memcache
        host: process.env.MEMCACHED_PORT_11211_TCP_ADDR || 'localhost',
        port: 11211,
        lifetime: 300, // seconds
    },
    max_upload_filesize: 10 * 1024 * 1024, // 10 MB
    defaultLang: 'en',
    adminRole: 'admin',
    clientRole: 'client',
    auth: {
        salt: process.env.AUTH_SALT || 'saltForHash',
    },
    allowedDomains: '*', // for CORS
    email: {
        disable: false, // disabling SMTP/email functionality when true (default: false)
        transport: {
            opts: {
                host: 'host',
                port: 465,
                auth: {
                    user: 'user_email',
                    pass: 'user_pass',
                },
                secure: true,
            },
        },
        sender: {
            name: 'Mail sender name',
            email: 'mail_sender@email.com',
        },
    },
    aws: {
        accessKeyId: 'YOURAWSACCESSKEY',
        secretAccessKey: 'yourAwsSecretAccessKey',
        region: 'us-east-1',
    },
    awsBucket: 'your-aws-bucket',
};
