FROM nginx:stable

# support running as arbitrary user which belongs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
# users are not allowed to listen on privileged ports
EXPOSE 8081


RUN apt-get update
RUN apt-get install -qq curl

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 8.4.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz"

RUN tar -zxvf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
&& rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
&& ln -s /usr/local/bin/node /usr/local/bin/nodejs

RUN npm install -g create-react-app
RUN npm install -g yarnpkg

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN rm -rf dist || true
COPY ./package.json /usr/src/app
RUN yarn

COPY ./public /usr/src/app/public
COPY ./src /usr/src/app/src
COPY * /usr/src/app/
RUN yarn build

RUN rm -rf /usr/share/nginx/html/* || true
RUN chmod -R 777 ./dist/*
RUN cp -r ./dist/* /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf