#!/bin/bash
set -e

if [ -z ${NODE_ENV+x} ]
  then echo "Environment variable NODE_ENV is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${INDABA_CLIENT_URL+x} ]
  then echo "Environment variable INDABA_CLIENT_URL is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${GREYSCALE_URL+x} ]
  then echo "Environment variable GREYSCALE_URL is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${AUTH_MICROSERVICE_URL+x} ]
  then echo "Environment variable AUTH_MICROSERVICE_URL is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${SURVEY_MICROSERVICE_URL+x} ]
  then echo "Environment variable SURVEY_MICROSERVICE_URL is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${MESSAGING_MICROSERVICE_URL+x} ]
  then echo "Environment variable MESSAGING_MICROSERVICE_URL is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${INDABA_CLIENT_DEFAULT_REALM+x} ]
  then echo "Environment variable INDABA_CLIENT_DEFAULT_REALM is required, but it is not set. Exiting."; exit 1;
fi

if [ -z ${SYS_MESSAGE_USER+x} ]
  then echo "Environment variable SYS_MESSAGE_USER is required, but it is not set. Exiting."; exit 1;
fi

SET_COOKIE_HEADER_NGINX_DIRECTIVE="add_header Set-Cookie 'indabaConfig={
    \"NODE_ENV\":\""$NODE_ENV"\",
    \"INDABA_CLIENT_URL\":\""$INDABA_CLIENT_URL"\",
    \"GREYSCALE_URL\":\""$GREYSCALE_URL"\",
    \"AUTH_MICROSERVICE_URL\":\""$AUTH_MICROSERVICE_URL"\",
    \"SURVEY_MICROSERVICE_URL\":\""$SURVEY_MICROSERVICE_URL"\",
    \"MESSAGING_MICROSERVICE_URL\":\""$MESSAGING_MICROSERVICE_URL"\",
    \"INDABA_CLIENT_DEFAULT_REALM\":\""$INDABA_CLIENT_DEFAULT_REALM"\",
    \"SYS_MESSAGE_USER\":\""$SYS_MESSAGE_USER"\"
    }; Path=/';"

echo $SET_COOKIE_HEADER_NGINX_DIRECTIVE >> /etc/nginx/indaba-client-nginx-set-header-directive.conf

nginx -g 'daemon off;'
