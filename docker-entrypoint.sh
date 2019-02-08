#!/bin/bash
set -e

echo "Updating settings.js on $(date)";

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

SET_CONFIG="NODE_ENV=\"$NODE_ENV\";\n
INDABA_CLIENT_URL=\"$INDABA_CLIENT_URL\";\n
GREYSCALE_URL=\"$GREYSCALE_URL\";\n
AUTH_MICROSERVICE_URL=\"$AUTH_MICROSERVICE_URL\";\n
SURVEY_MICROSERVICE_URL=\"$SURVEY_MICROSERVICE_URL\";\n
MESSAGING_MICROSERVICE_URL=\"$MESSAGING_MICROSERVICE_URL\";\n
INDABA_CLIENT_DEFAULT_REALM=\"$INDABA_CLIENT_DEFAULT_REALM\";\n
SYS_MESSAGE_USER=\"$SYS_MESSAGE_USER\";\n"

echo -e $SET_CONFIG >> /usr/share/nginx/html/settings.js

nginx -g 'daemon off;'
